import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import CompInputBaseTable from 'component/compInputBaseTable';
import config from 'common/configuration'
import Panel from 'component/compPanel'
import './style.css'
import req from 'reqwest'
import Model from './model.js' 
import auth from 'common/auth'
import SearchForm from './searchForm'
import { Router, Route, Link } from 'react-router'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message,Dropdown,Menu }from 'antd'
// 标签定义
const TabPane = Tabs.TabPane;
const API_URL = config.HOST+config.URI_API_PROJECT + '/swsrycx/zyry';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const rycx = React.createClass({
  getInitialState() { //初始化State状态，使用传入参数
      return {
        //这些都是dataset
            dataxx: {values: {}},//用于详细信息autoform数据格式
            datalist:[],//用于其他详细table数据格式
            data: [],//用于主查询
            pagination: Model.pageSetting,//从model加载常量
            urls:{},//详细信息URL
            searchToggle: false,
            where:{},
            spzt:"",
              activeKey:"",
      };
    },

  fetch_rycx(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}) {
     this.setState({loading:true,});//主查询加载状态
      req({
            url: API_URL,//默认数据查询后台返回JSON
            method: 'get',
            type: 'json',
            data: params,
            contentType: 'application/json',
            headers:{'x-auth-token':auth.getToken()},
            success: (result) => {
                      if (result.data.length!=0) {
                          const pagination = this.state.pagination;
                          pagination.total = result.page.pageTotal;//要求后台返回json写法有属性page，该属性包含pageTotal（总条数值）
                              this.setState({
                                      data: result.data,//传入后台获取数据，table组件要求每条查询记录必须拥有字段'key'
                                      urls:result.data[0]._links,
                                      loading:false,//关闭加载状态
                               });
                          this.onSelect(result.data[0]);//联动详细信息，重新调用方法
                    }else{//空数据处理
                         const pagination = this.state.pagination;
                         pagination.total = 0;
                         this.setState({data: [],dataxx: {values: {}},datalist:[],loading:false, });
                    };
            },
            error: (err) =>{alert('api错误');}
    });
  },

    fetch_kzxx(tabkey) {//详细信息（tab）数据处理方法，不能使用switch，否则会发生未知错误
      // let tabkey =this.state.tabkey //获取当前tab标签的key
      if (tabkey==1) {
        req({
        url: this.state.urls.herf_xxzl,//从主查询获取的后台dataProvider路径
        method: 'get',
        type: 'json',
        success: (result) => {
          this.setState({
            dataxx: result.data,
            datalist: result.data.ryjl,//简历的data
          });
        },error:  (err) =>{alert('api错误');}
      });
      }else if (tabkey==2) {
        this.gettabdata(this.state.urls.herf_bgjl);
      }else if (tabkey==7) {
        this.gettabdata(this.state.urls.herf_njjl);
      };
    },
    gettabdata(urls){
      req({url: urls,method: 'get',type: 'json',
          success: (result) => {
            if (result.data.length!=0) {
            this.setState({datalist: result.data})
            }else{
               this.setState({datalist:[],})
             }
          },error: (err) =>{alert('api错误');}
        });
    },

    handleTableChange(pagination, filters, sorter) {//onChange方法，分页、排序、筛选变化时触发，必须三个参数才能准确获取
          const tablewhere = this.state.where;
          tablewhere.sfield = sorter.field;
          tablewhere.sorder = sorter.order;
          const paper = this.state.pagination;     //把this.state.pagination指向paper，与setState异曲同工，目的是更改单一属性数据
          paper.pageSize = pagination.pageSize;
          paper.current = pagination.current;
          this.fetch_rycx({//调用主查询
                pagenum: pagination.current,
                pagesize: pagination.pageSize,
                where:encodeURIComponent(JSON.stringify(tablewhere)),
          });
  },

    onSelect(record){//主查询记录被选中方法
       this.state.urls=record._links;
       const dm = record.rysfdm;
     this.setState({activeKey:1});
       this.callback(1);
    },

    handleSearchToggle(){//点击查询按钮，显示查询form
        this.setState({searchToggle: !this.state.searchToggle});
    }, 

    handleOk(value) {//点击搜索按钮触发事件
      this.setState({where:value});
      const paper = this.state.pagination;     //把当前页重置为1
        paper.current = 1;
       this.fetch_rycx({//调用主查询
        pagenum: 1,
        pagesize: this.state.pagination.pageSize,
        where:encodeURIComponent(JSON.stringify(value)),
      })
  },

  callback(key) {//tab标签变化返回值与方法
    this.setState({activeKey:key});
      this.fetch_kzxx(key);
},


  componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
      this.fetch_rycx(); //异步调用后台服务器方法fetch_rycx
    },

    render() {
        const menu = (
              <Menu >
                <Menu.Item key="0">
                  <Link to="client/swsrygl/zyrygl/sub">转籍出省</Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <a >转入分所</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                  <a >转所</a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a >转出</a>
                </Menu.Item>
              </Menu>
            );
      const columns = [{ //设定列
                  title: '序号', //设定该列名称
                  dataIndex: 'xh', //设定该列对应后台字段名
                  key: 'xh', //列key，必须设置，建议与字段名相同
                  render(text, row, index) {
                    if (row.ryztdm!=1) {
                        return <span style={{'color':'red'}}>{text}</span>;
                    };
                    return <p>{text}</p>;
                  }
                }, {
                  title: '人员名称',
                  dataIndex: 'xm',
                  key: 'xm',
                  sorter: true, //是否可以排序，需后台写排序方法
                  render(text, row, index) {
                    if (row.ryztdm!=1) {
                        return <span style={{'color':'red'}}>{text}</span>;
                    };
                    return <p>{text}</p>;
                  }
                }, {
                  title: '性别',
                  dataIndex: 'xb',
                  key: 'xb',
                },{
                  title: '身份证号码',
                  dataIndex: 'sfzh',
                  key: 'sfzh',
                },  {
                  title: '执业注册（备案）编号',
                  dataIndex: 'zyzsbh',
                  key: 'zyzsbh',
                  
                }, {
                  title: '城市',
                  dataIndex: 'cs',
                  key: 'cs',
                }, {
                  title: '学历',
                  dataIndex: 'xl',
                  key: 'xl',
                  sorter: true,
                }, {
                  title: '职务（职称）',
                  dataIndex: 'zw',
                  key: 'zw',
                  sorter: true,
                }, {
                  title: '人员状态',
                  dataIndex: 'ryzt',
                  key: 'ryzt',
                  sorter: true,
                },  {
              title: '操作',
              key: 'operation',
              render(text, row, index) {
                  if (row.ryztdm==3) {
                        return <span>
                                  <a >重新申请备案</a>
                                </span>
                    };
                    return  <span>
                                  <a >信息变更</a>
                                  <span className="ant-divider"></span>
                                  <a >转非执业</a>
                                  <span className="ant-divider"></span>
                                  <a >注销备案</a>
                                  <span className="ant-divider"></span>
                                  <Dropdown overlay={menu}>
                                  <a  className="ant-dropdown-link">
                                    税务师调动 <Icon type="down" />
                                  </a></Dropdown>
                                </span>
              },
            }];
        let toolbar = <ToolBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
                  <Icon className="toggle-tip" type="arrow-down"/>}
            </Button>
        </ToolBar>;
      return <div className="rycx">
<div className="wrap">
   <div className="dataGird">
     <Panel   toolbar={toolbar}>

          {this.state.searchToggle && <SearchForm onSubmit={this.handleOk}/>}

              <Table columns={columns} 
              dataSource={this.state.data} 
              pagination={this.state.pagination}
              onChange={this.handleTableChange} 
              onRowClick={this.onSelect}
              loading={this.state.loading}  bordered   />
        </Panel>
    </div>

      <Panel >
           <Tabs type="line" activeKey={this.state.activeKey} onChange={this.callback} key="A">
                <TabPane tab="详细信息" key="1"><CompBaseTable data = {this.state.dataxx}  model ={Model.autoform} bordered striped /><p className="nbjgsz">人员简历：</p><Table columns={Model.ryjl} dataSource={this.state.datalist} bordered  size="small" pagination={false} /></TabPane>
                <TabPane tab="变更记录" key="2"><Table columns={Model.columnsZyrybgjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
                <TabPane tab="年检记录" key="7"><Table columns={Model.columnsZyrynjjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
          </Tabs>
                </Panel>
                <Panel >
                <CompInputBaseTable data = {this.state.dataxx}  model ={Model.autoform} bordered striped /></Panel>

          </div>  
      </div>
        
    }
})
module.exports = rycx;



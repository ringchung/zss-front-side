import './style.css'
import React from 'react'
import {Table,Col,Row,Tree,Tabs,Modal,Button,Spin,notification,Icon } from 'antd'
import Panel from 'component/compPanel'
import config from 'common/configuration'
import {SelectorRoles,SelectorDQ,SelectorCS} from 'component/compSelector'
import SearchForm from './searchForm'
import model from './model.jsx'
import req from 'reqwest'
import {jsonCopy} from 'common/utils.js'

const PanelBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const USER_URL = config.HOST + config.URI_API_FRAMEWORK + '/users';
const ROLE_URL = config.HOST + config.URI_API_FRAMEWORK + '/roles';

//获取用户列表
const fetchUsers = function (param = {page: 1, pageSize: 10}) {
    return req({
        url: USER_URL,
        method: 'get',
        type: 'json',
        data: param
    })
};
//获取角色列表
const fetchRoles = function () {
    return req({
        url: ROLE_URL,
        method: 'get',
        type: 'json'
    })
};

//异步获取数据
const fetchData = async function () {
    let [users,roles] = await Promise.all([fetchUsers(), fetchRoles()]);
    return {users: users, roles: roles}
};


//权限管理
const yhgl = React.createClass({
    getInitialState(){
        return {
            pageLoading: true,
            searchToggle:false,
            helper:false,
            roles: [],
            users: [],
            select: '',
            where: '',
            selectedRowKeys: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 10,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']

            }
        }
    },

    componentDidMount(){
        fetchData().then(resp=> {
            const p = this.state.pagination;
            p.total = resp.users.total > 1000 ? 1000 : resp.users.total;
            p.showTotal = total => {
                return `共 ${resp.users.total} 条，显示前 ${total} 条`
            };
            this.setState({
                pageLoading: false,
                roles: resp.roles,
                users: resp.users.data,
                pagination: p
            })
        }).catch(e=> {
            this.setState({pageLoading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {e.status}</p>
                    </div>  )
            });
        })
    },

    //数据表换页
    handlePageChange(pager){
        fetchUsers({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        }).then(resp=> {
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({pagination: pager, users: resp.data, selectedRowKeys: []});
        })
    },
    //选择角色
    handleRoleSelected(value){
        const pager = this.state.pagination;
        let where = {roleId: value};
        const param = {
            page: 1,
            pageSize: pager.pageSize,
            where: JSON.stringify(where)
        };
        fetchUsers(param).then(resp=> {
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            pager.current = 1;
            this.setState({users: resp.data, where: where, pagination: pager});
        })
    },
    //表格中的复选框勾选
    handleSelectedRowChange(selectedRowKeys, selectedRows){
        this.setState({selectedRowKeys: selectedRowKeys})
    },
    //打开关闭查询框
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle})
    },
    //刷新数据
    handleRefresh(){
        const pager = this.state.pagination;
        this.setState({pagination: pager, where: ''});
        fetchUsers().then(resp=> {
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            pager.current = 1;
            this.setState({users: resp.data, where:'', pagination: pager});
        });
    },

    //帮助信息
    handleHelper(){
        this.setState({helper: !this.state.helper})
    },
    //查询提交
    handleSearchSubmit(values){
        this.setState({pageLoading:true})
        const pager = this.state.pagination;
        const param = {
            page:1,
            pageSize:pager.pageSize,
            where: encodeURIComponent(JSON.stringify(values))
        };
        fetchUsers(param).then(resp=>{
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            pager.current = 1;
            this.setState({users:resp.data,where:values, pagination: pager,pageLoading:false})
        })
    },


    render(){
        const rowSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleSelectedRowChange
        };

        const panelBar = <PanelBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>
            <SelectorRoles
                style={{width:'180px'}}
                data={this.state.roles}
                optionFilterProp="children"
                onChange={this.handleRoleSelected}/>
        </PanelBar>;


        return <div className="yhgl">
            <div className="wrap">
                <Spin spinning={this.state.pageLoading}>
                    <Panel title="用户管理" toolbar={panelBar}>
                        {this.state.searchToggle && <SearchForm
                            onSubmit={this.handleSearchSubmit}/>}
                        <Table className="outer-border"
                               columns={model.columns}
                               dataSource={this.state.users}
                               pagination={this.state.pagination}
                               onChange={this.handlePageChange}
                               rowKey={record => record.id}
                               rowSelection={rowSelection}
                               onRowClick={this.handleRowClick}
                        />
                    </Panel>
                </Spin>
            </div>
        </div>
    }
});

module.exports = yhgl;
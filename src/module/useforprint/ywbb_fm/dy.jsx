import React from 'react'
import './dy.css'
import {Row, Col, Modal} from 'antd'

var cssPagedMedia = (function () {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return function (rule) {
        style.innerHTML = rule;
    };
}());

cssPagedMedia.size = function (size) {
    cssPagedMedia('@page {size: ' + size + '}');
};

const confirm = Modal.confirm;
let dy = React.createClass({
    onClick(){
        window.print();
        confirm({
            title: '打印信息',
            content: '是否打印完成？',
            okText: "是",
            cancelText: "否",
            onOk() {
                window.close();
            },
            onCancel() {
            },
        });
    },
    render(){

        cssPagedMedia.size('A4 portrait');
        let data = this.props.location.query.data;
        if (typeof  data != 'object'){
            data = JSON.parse(data);
        }
        const nowy = new Date();
        return <div className="dy-ywcover c26">
                <p className="c5"><span></span></p>
                <p className="c5"><span></span></p>
                <p className="c5"><span></span></p>
                <a id="t.898ebee2b7aaac4487506a87984cd16470d6f443"></a>
                <a id="t.0"></a>
                <table className="c4">
                    <tbody>
                    <tr className="c13">
                        <td className="c0" colSpan="1" rowSpan="1">
                            <p className="c22"><span className="c17">{data.wtdw}</span></p>
                        </td>
                    </tr>
                    <tr className="c13">
                        <td className="c0" colSpan="1" rowSpan="1">
                            <p className="c22"><span className="c17">{data.ywlx}</span></p>
                        </td>
                    </tr>
                    <tr className="c13">
                        <td className="c0" colSpan="1" rowSpan="1">
                            <p className="c22"><span className="c10">{data.sstarttime + ' - ' + data.sendtime}</span></p>
                        </td>
                    </tr>
                    <tr className="c13">
                        <td className="c0" colSpan="1" rowSpan="1">
                            <p className="c22"><span className="c25">{data.jtxm}</span></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="c5"><span></span></p>
                <p className="c5"><span></span></p>
                <hr/>
                    <p className="c5"><span className="c12"></span></p>
                    <p className="c5"><span></span></p>
                    <p className="c5"><span></span></p>
                    <a id="t.b7e56ebf297963d11b8d73a58c3b0db7c33a27a8"></a>
                    <a id="t.1"></a>
                    <table className="c4">
                        <tbody>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#38450; &#20266; &nbsp;&#26465; &nbsp;&#24418; &nbsp;&#30721; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c23" colSpan="1" rowSpan="1">
                                <p className="c6 c8"><span className="c1"></span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#25253; &nbsp; &#22791; &nbsp; &#21495; &nbsp; &#30721; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c21" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.bbhm}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#25253; &nbsp; &#21578; &nbsp; &#25991; &nbsp; &#21495; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.bgwh}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#20225; &nbsp; &#19994; &nbsp; &#21517; &nbsp; &#31216; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.wtdw}</span></p>
                            </td>
                        </tr>
                        <tr className="c24">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#31246; &#21153; &#30331; &#35760; &#35777; &#21495; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6 c8"><span className="c1">{data.wtdw}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#20027; &#31649; &#31246; &#21153; &#26426; &#20851; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6 c8"><span className="c1">{data.zgswjg}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#20107; &#21153; &nbsp;&#25152; &nbsp;&#21517; &nbsp;&#31216; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6 c8"><span className="c1">{data.swsmc}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#25253; &nbsp; &#21578; &nbsp; &#26085; &nbsp; &#26399; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.bgrq}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#25253; &nbsp; &#22791; &nbsp; &#26085; &nbsp; &#26399; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.bbrq}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c9" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c2">&#12304; &#31614; &#21517; &nbsp;&#31246; &nbsp;&#21153; &nbsp;&#24072; &#12305;&#65306;</span></p>
                            </td>
                            <td className="c7" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.qzsws}</span></p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="c5"><span></span></p>
                    <p className="c5"><span></span></p>
                    <p className="c5"><span></span></p>
                    <a id="t.45b59b2954937cd44d27e3dfc8867eae70a983cf"></a>
                    <a id="t.2"></a>
                    <table className="c4">
                        <tbody>
                        <tr className="c18">
                            <td className="c15" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c1">&#20107; &#21153; &#25152; &#30005; &#35805;&#65306;</span></p>
                            </td>
                            <td className="c16" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.wtdw}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c15" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c1">&#20256; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&#30495;&#65306;</span></p>
                            </td>
                            <td className="c16" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.swscz}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c15" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c1">&#36890; &nbsp;&#20449; &nbsp;&#22320; &nbsp;&#22336;&#65306;</span></p>
                            </td>
                            <td className="c16" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.txdz}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c15" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c1">&#30005; &nbsp;&#23376; &nbsp;&#37038; &nbsp;&#20214;&#65306;</span></p>
                            </td>
                            <td className="c16" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c1">{data.swsdzyj}</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c15" colSpan="1" rowSpan="1">
                                <p className="c3"><span className="c1">&#20107; &#21153; &#25152; &#32593; &#22336;&#65306;</span></p>
                            </td>
                            <td className="c16" colSpan="1" rowSpan="1">
                                <p className="c6 c8"><span className="c1">{data.swswz}</span></p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="c5"><span></span></p>
                    <a id="t.55e22d1cb25eb0693d1aca3918b5fdd74b4dd1e7"></a>
                    <a id="t.3"></a>
                    <table className="c4">
                        <tbody>
                        <tr className="c18">
                            <td className="c20" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c14 c11">&#38450;&#20266;&#30721;</span></p>
                            </td>
                        </tr>
                        <tr className="c13">
                            <td className="c19" colSpan="1" rowSpan="1">
                                <p className="c6"><span className="c11 c14">&#38450;&#20266;&#26597;&#35810;&#32593;&#22336;&#65306;http://www.gdcta.net</span></p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="c5"><span className="c11"></span></p>
            <div>
                <button className="noprint" type="button" onClick={this.onClick}
                        style={{'position': 'relative', 'left': '45%', 'width': '60px', 'top': '100%'}}>打印
                </button>
            </div>
        </div>
    }
});
module.exports = dy;
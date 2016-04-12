import React from 'react'
import './style.css'
const panel = React.createClass({
    render(){
        let {title} = this.props;
        return <div className="panel">
            {title?<div className="panel-title"><h2>{this.props.title}</h2></div>:null}
            <div className="panel-body">
                {this.props.children}
            </div>
        </div>
    }
})

module.exports = panel;
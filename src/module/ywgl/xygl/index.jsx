/*模块设置功能*/
module.exports = {
    path: 'ywgl/xygl(/)',
    breadcrumbName:'协议管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
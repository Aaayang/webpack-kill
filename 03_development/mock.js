module.exports = function(app) {
    app.get('/api/users', (req, res)=> {
        res.send({
            user: 'wx',
            age: 18
        });
    });
    app.get('/api/about', (req, res)=> {
        res.send({
            user: '关于我们',
            age: 18
        });
    });
};
const mainController = require('../controller/main');
// add someting
module.exports = (app)=>{
    app.get('/', mainController.index);
};

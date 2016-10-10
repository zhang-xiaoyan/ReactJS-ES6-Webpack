var path = require("path");
module.exports = {
    entry:{
        build:"./todo1/index.jsx"
    },
    output:{
        path:"./todo_build/",
        filename:"[name].js"
    },
    module:{
        loaders:[
            {
                test:/.css$/,
                loaders:["style","css"],
                exclude:/node_modules/
            },
            {
                test:/.jsx?$/,
                loader: 'babel?presets=es2015&presets[]=react',
                exclude:/node_modules/,
                include:path.resolve(__dirname,"todo1")
            }
        ]
    }
};
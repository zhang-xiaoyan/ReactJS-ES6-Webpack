
import { store } from "./util.js";

let app = {
    dataArr:[],
    info:function(){
        store("todo", app.dataArr);
    },
    addItem:function(value){
        app.dataArr.push({
            id:Date.now(),
            content:value,
            compile:false
        });
        app.info();//存数据
        app.render(app.dataArr);
    },
    toggleAll:function(bloon){
        app.dataArr.forEach(function(item,index){
            item.compile = bloon;
        });
        app.info();
        app.render(app.dataArr);
    },
    toggle:function(id){
        app.dataArr.forEach(function(item,index){
            if(item.id === id){
                item.compile = !item.compile;
            }
        });
        app.info();
        app.render(app.dataArr);// 渲染页面
    },
    delectItem:function(id){
        var newArr = app.dataArr.filter(function(item,index){
            return item.id != id;
        });
        app.dataArr = newArr;
        app.info();
        app.render(app.dataArr);
    }
};

app.dataArr = store("todo") || []; // 取出来

export default app;
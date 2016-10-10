
import React from "react";
import ReactDOM from "react-dom";
import app from "./app.js";// 引入 app 模块
import Item from "./item.jsx";

require("./css/index.css");
require("./css/base.css");

/* class Main extends React.Component{} 也可以创建组件 */

var Main = React.createClass({
    render(){
        var dataArr = this.props.dataArr;
        var content,footer;
        var num = 0;
        dataArr.reduce(function(n,item){
            num = item.compile?num:num+1
        },0);
        if(dataArr.length !== 0){
            content = <section className="main">
                        <input className="toggle-all" type="checkbox" checked={num==0} onChange={this.toggleAll}/>
                            <ul className="todo-list">
                                {
                                    dataArr.map(function(item,index){
                                        return <Item
                                                 key={index} {...item}
                                                 toggle={app.toggle.bind(this,item.id)}
                                                 delectItem={app.delectItem.bind(this,item.id)}>
                                                </Item>
                                    }.bind(this))// 把this改成当前组件的this
                                }
                            </ul>
                     </section>;
            footer = <footer className="footer">
                        <span className="todo-count">
                            <strong>0</strong>
                            <span>{num}</span>
                        </span>
                    </footer>;
        }
        return(
            <div>
                <header className="header" >
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="请输入内容"
                        defaultValue=""
                        onKeyDown={this.downHandle}
                    />
                </header>
                {content}
                {footer}
            </div>
        )
    },
    downHandle(ev){
       if(ev.keyCode === 13){
           app.addItem(ev.target.value);
           ev.target.value = "";
       }
    },
    toggleAll(ev){
        app.toggleAll(ev.target.checked);
    }
});

var section = document.createElement("section");

section.className = "todoapp";

document.body.appendChild(section);

// ReactDOM.render(<Main dataArr={app.dataArr}/>,section);// 放到 section 这个新建的元素里面
// 从 app 模块下取数据

function render(dataArr){
    ReactDOM.render(<Main dataArr={dataArr}/>,section);
}

render(app.dataArr);

app.render = render;// 给 app 添加一个 render 方法，app.dataArr 数据发生了变化，就要重新调用这个方法
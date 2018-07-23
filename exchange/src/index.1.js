import React from 'react';
import ReactDOM from 'react-dom';

function BuySomething(props){
    let money = parseFloat(props.money);
    if(Number.isNaN(money)){
        return <p>你说啥, 给钱!</p>
    }

    if(money >= 10){
        return <p>购买成功! 金额: ￥{money}, 找零: ￥{money - 10}</p>
    }

    return <p>购买失败, 金额: ￥{money}</p>
}

class MoneyInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            money: 0
        }
    }

    /**
     * 处理用户输入变化
     * 1. 通过onChange监听input数据变化
     * 2. 得到用户输入的内容, 修改后, 再设置回去
     * @param e
     */
    handleInputChange = (e) => {
        console.log("输入内容了: " + e.target.value);
        const money = e.target.value;
        this.setState({
            money: money.substring(0, 6).replace(/[^\d]+/, '')
        })
    };

    render(){
        return(
            <div>
                <h2>付款计算器, 货币兑换</h2>
                <fieldset>
                    <legend>请输入付款金额</legend>
                    {/*受控组件*/}
                    <input type="text" value={this.state.money} onChange={this.handleInputChange}/>
                </fieldset>
                <BuySomething money={this.state.money}/>
            </div>
        )
    }
}

ReactDOM.render(
    <MoneyInput />,
    document.getElementById('root')
);
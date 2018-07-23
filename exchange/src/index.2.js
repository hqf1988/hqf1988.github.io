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

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            unit: 'rmb',
            money: 0
        }
    }
    // 处理用户输入的人民币值
    handleRMBInput = (money) => {
        this.setState({
            unit: 'rmb',
            money: money
        })
    };
    // 处理用户输入的美金值
    handleUSDInput = (money) => {
        this.setState({
            unit: 'usd',
            money: money
        })
    };
    // 1美金 -> 6.7人民币
    toRMB(money){
        return money * 6.7
    }
    // 6.7人民币 -> 1美金
    toUSD(money){
        return money / 6.7
    }
    convert(converter, money){
        let result = converter(money);

        // 保留三位小数
        // 1.5462686567164179 => 1.546
        // 1.5462686567164179 => 1546.2686567164179
        result = Math.round(result * 1000) / 1000;

        return result
    }

    render(){
        console.log("当前最新的state信息: " + JSON.stringify(this.state));

        let money = this.state.money;
        let unit = this.state.unit;

        // 根据当前最新的state中的unit单位和money值转换成另外一种货币
        const rmb = unit === 'rmb' ? money : this.convert(this.toRMB, money);// 美元转成人民币
        const usd = unit === 'usd' ? money : this.convert(this.toUSD, money);// 人民币转成美元

        return(
            <div style={{backgroundColor: '#DDD'}}>
                <h2>付款计算器, 货币兑换</h2>

                <MoneyInput unit='rmb' money={rmb} onMoneyInput={this.handleRMBInput}/>
                <MoneyInput unit='usd' money={usd} onMoneyInput={this.handleUSDInput}/>

                <BuySomething money={money}/>
            </div>
        )
    }
}
const unitNames = {
    rmb: '人民币',
    usd: '美元'
}

class MoneyInput extends React.Component {

    /**
     * 处理用户输入变化
     * 1. 通过onChange监听input数据变化
     * 2. 得到用户输入的内容, 修改后, 再设置回去
     * @param e
     */
    handleInputChange = (e) => {
        console.log("输入内容了: " + e.target.value);
        let money = e.target.value;
        money = money.substring(0, 6).replace(/[^\.\d]+/, '');
        // 不再设置给自己, 而是传给父组件
        this.props.onMoneyInput(money)
    };
    render(){
        return (

            <fieldset style={{backgroundColor: '#EEE'}}>
                <legend>请输入付款金额 ({unitNames[this.props.unit]}): </legend>
                {/*受控组件*/}
                <input type="text" value={this.props.money} onChange={this.handleInputChange}/>
            </fieldset>
        )
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
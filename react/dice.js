import React from 'react';
import ReactDOM from 'react-dom';


class Cards extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            botch: false,
            success: false,
            crit: false
        };

        this.highlightCrit = this.highlightCrit.bind(this);
        this.highlightSuccess = this.highlightSuccess.bind(this);
        this.highlightBotch = this.highlightBotch.bind(this);
    }

    highlightCrit(event){
        const crit = this.state.crit;
        this.setState({crit : !crit})
    }

    highlightSuccess(event){
        const success = this.state.success;
        this.setState({success : !success})
    }

    highlightBotch(event){
        const botch = this.state.botch;
        this.setState({botch : !botch})
    }


    render(){

        const crit = this.state.crit;
        const success = this.state.success;
        const botch = this.state.botch;

        return(
            <div className="container">
                <div>
                    <p className='h1 text-center'>DiceRoll!</p>
                    <p className='font-weight-light text-center'>Forget your dice? No worries, I've got your back.</p>
                    <p className='font-weight-light text-center'>Roll up to 10 of any sided die at once.</p>
                    <p className='font-weight-light text-center'>Count your Successes, Crits, and Botches at a glace with the ultimate bag of dice that won't leave your side.</p>

                    <form className="mx-4">
                        <div className='row'>
                            <div className='form-check form-check-inline'>

                                <input className="form-check-input" type="checkbox" id="botch" onClick={this.highlightBotch}></input>
                                <label className="form-check-label" htmlFor="botch">
                                    Highlight Botches
                                </label>

                            </div>
                            <div className='form-check form-check-inline'>

                                <input className="form-check-input" type="checkbox" id="success" onClick={this.highlightSuccess}></input>
                                <label className="form-check-label" htmlFor="success">
                                    Highlight Successes
                                </label>

                            </div>
                            <div className='form-check form-check-inline'>
                                <input className="form-check-input" type="checkbox" id="crit" onClick={this.highlightCrit}></input>
                                <label className="form-check-label" htmlFor="crit">
                                    Highlight Crits
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                <DicePool
                    crit = {crit}
                    success = {success}
                    botch = {botch}
                />
                <DicePool
                    crit = {crit}
                    success = {success}
                    botch = {botch}
                />
            </div>
        )
    }

}

class DicePool extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            poolSize: 1,
            sides: 20,
            rolls:[],
            target: 0,

        };

        this.updatePoolSize = this.updatePoolSize.bind(this);
        this.updateSides = this.updateSides.bind(this);
        this.updateRolls = this.updateRolls.bind(this);
        this.updateTarget = this.updateTarget.bind(this);

    }



    updateTarget(event){
        this.setState({
            target: parseInt(event.target.value)
        })
    }

    updatePoolSize(event){
        this.setState({
            poolSize: parseInt(event.target.value)
        })
    }

    updateSides(event){
        this.setState({sides: event.target.value})
    }

    updateRolls(){
        const poolSize = this.state.poolSize;
        const sides = this.state.sides;
        const rolls = [];
        for(let i=0;i<poolSize;i++){
            rolls.push(Math.floor(Math.random() * sides+1))
        }
        this.setState({rolls: rolls})

    }

    render(){
        const sides = this.state.sides;
        const rolls = this.state.rolls;
        const target = this.state.target;
        const crit = this.props.crit;
        const success = this.props.success;
        const botch = this.props.botch;



        return(
            <div className = 'container'>
                <div className= {'header my-3 dice-background ' + 'sides'+sides}>
                </div>
                <form>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label htmlFor='dice'>Dice Type  </label>
                                <select className = 'form-control' name='dice' value={this.state.sides}  onChange = {this.updateSides}>
                                    <option value='4'>4 Sided Die</option>
                                    <option value='6'>6 Sided Die</option>
                                    <option value='8'>8 Sided Die</option>
                                    <option value='10'>10 Sided Die</option>
                                    <option value='12'>12 Sided Die</option>
                                    <option value='20'>20 Sided Die</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label htmlFor='poolSize'>Pool Size  </label>
                                <select className = 'form-control' name='poolSize'  value={this.state.poolSize}  onChange = {this.updatePoolSize}>
                                    <option value='1'>1 Die</option>
                                    <option value='2'>2 Die</option>
                                    <option value='3'>3 Die</option>
                                    <option value='4'>4 Die</option>
                                    <option value='5'>5 Die</option>
                                    <option value='6'>6 Die</option>
                                    <option value='7'>7 Die</option>
                                    <option value='8'>8 Die</option>
                                    <option value='9'>9 Die</option>
                                    <option value='10'>10 Die</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label htmlFor='target'>Target Number  </label>
                                <select className = 'form-control' name='target'  value={this.state.updateTarget}  onChange = {this.updateTarget}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                    <option value='13'>13</option>
                                    <option value='14'>14</option>
                                    <option value='15'>15</option>
                                    <option value='16'>16</option>
                                    <option value='17'>17</option>
                                    <option value='18'>18</option>
                                    <option value='19'>19</option>
                                    <option value='20'>20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='row my-4'>
                    <div className ='col'>
                        <button className='btn btn-outline-primary btn-lg btn-block' onClick={this.updateRolls}>Roll!</button>
                    </div>
                </div>
                <div className='row'>
                    {rolls.map((x, index)=>{
                        return <Dice
                            roll = {x}
                            target = {target}
                            sides = {sides}
                            crit = {crit}
                            success = {success}
                            botch = {botch}
                            key = {index}
                        />
                    })}
                </div>
            </div>
        )
    }
}


class Dice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
        this.colorMap = this.colorMap.bind(this);

    }

    colorMap(){
        const {target, roll, sides, botch, success, crit} = this.props;

        switch(true){
            case (roll === 1 && botch):
                return 'bg-danger';
            case (roll == sides && crit):
                return 'bg-warning';
            case (roll >= target && success):
                return 'bg-success';
        }
    }

    render(){
        const roll = this.props.roll;
        const target = this.props.target;

        return(
            <div className="col-6">
                <div className="row">
                    <div className="col">
                        <div className={'border ' + this.colorMap()}>
                            <p className='text-center roll'>{roll}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Cards/>,
    document.getElementById('root')
);
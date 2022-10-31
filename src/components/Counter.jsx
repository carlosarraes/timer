import React, { Component } from 'react'

const SECOND = 1000;

class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tempo: 0,
      error: false,
    }
  }

  callTimer() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({...prevState, tempo: prevState.tempo - 1}))
    }, SECOND);
  }

  componentDidMount() {
    const { tempo: tempoProps } = this.props
    const splitTempo = tempoProps.split(' ')
    let convertedTempo = 0;
    let countOk = false;

    if (splitTempo.length > 1){
      convertedTempo = (Number(splitTempo[0].slice(0, -1))*60) + (Number(splitTempo[1].slice(0,-1)))
      countOk = true;
    } else {
      if(splitTempo[0].includes('m')) {
        convertedTempo = (Number(splitTempo[0].slice(0, -1))*60)
        countOk = true;
      } else if(splitTempo[0].includes('s')) {
        convertedTempo = (Number(splitTempo[0].slice(0, -1)))
        countOk = true;
      }
    }
    this.setState({tempo: convertedTempo});
    
    if (countOk) return this.callTimer();
    else return this.setState({error: true});
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate() {
    const { tempo } = this.state;
    if ( tempo === 0 ) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { tempo, error } = this.state;

    return (
      <>
        { error ?
          <> 
            <h1>Error, tente novamente.</h1> 
            <p>tempo tem q ser exatamente como o exemplo:  3m 15s</p>
          </>:
          <>
            <h1 className='text-4xl font-bold'>{`${tempo}s`}</h1>
            {tempo === 0 && <span className='text-xl font-bold my-3'>É HEXA!</span>}
          </>}
      </>
    )
  }
}

export default Counter
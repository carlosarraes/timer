import React, { Component } from 'react'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'

const SECOND = 1000;

class Counter extends Component {
  state = {
    tempo: 0,
    segundos: 0,
    minutos: 0,
    error: false,
    start: true,
  }

  callTimer = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({...prevState, tempo: prevState.tempo - 1, segundos: prevState.segundos - 1}))
    }, SECOND);
  }

  pauseTimer = () => {
    clearInterval(this.intervalId);
    this.setState({start: false});
  }

  restartTimer = () => {
    this.callTimer();
    this.setState({start: true});
  };

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
    const convertedMinutos = Math.floor(convertedTempo / 60);
    const convertedSegundos = convertedTempo % 60;

    this.setState({tempo: convertedTempo, segundos: convertedSegundos, minutos: convertedMinutos});
    
    if (countOk) return this.callTimer();
    else return this.setState({error: true});
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate() {
    const { tempo, segundos, minutos, start } = this.state;
    if ( tempo === 0 ) clearInterval(this.intervalId);

    if ( segundos === 0 && minutos && start) this.setState((prevState) => ({...prevState, minutos: prevState.minutos - 1, segundos: 60}))
  }

  render() {
    const { tempo, minutos, segundos, error, start } = this.state;

    return (
      <>
        { error ? (
            <section> 
              <h1>Error, tente novamente.</h1> 
              <p>tempo tem q ser exatamente como o exemplo:  3m 15s</p>
            </section>
          ) : (
            <section className='flex flex-col justify-center items-center gap-2'>
              <div className='flex justify-between items-center gap-6'>
                <h1 className='text-8xl font-bold'>{`${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`}</h1>
                { start ? (
                  <AiFillPauseCircle className='cursor-pointer text-2xl' onClick={this.pauseTimer} />
                ) : (
                  <AiFillPlayCircle className='cursor-pointer text-2xl' onClick={this.restartTimer} />
                )}
              </div>
              {tempo === 0 && <span className='text-xl font-bold my-3'>É HEXA!</span>}
            </section>
          )}
      </>
    )
  }
}

export default Counter
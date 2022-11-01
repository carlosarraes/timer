import React, { Component } from 'react'
import Counter from './Counter';

class Timer extends Component {
  state = {
    tempo: '',
    timer: false,
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({...prevState, [name]: value }));
  };

  handleStart = (e) => {
    const {tempo} = this.state;
    this.setState((prevState) => ({...prevState, timer: !prevState.timer, tempo }));
  };

  render() {
    const { tempo, timer } = this.state;

    return ( 
      <main className='text-white'>
        <section className='flex flex-col justify-center items-center w-full'> 
          {timer ? (
            <Counter tempo={tempo} />
          ) : 
          (<>
            <label htmlFor="tempo" className='my-2 text-xl'>Insira o tempo (Ex.: 1m 30s)</label>
            <input
              type="text"
              name="tempo"
              id="tempo"
              className='rounded-md w-full text-black text-center focus:ring-0'
              value={tempo}
              placeholder="2m 45s"
              onChange={this.handleChange}
            />
          </>)}
        </section>
        <section className='mt-4 flex justify-between gap-2'>
          <button
            type='button'
            className='rounded-md font-bold border-2 py-2 px-4 enabled:hover:bg-slate-400 duration-300 w-72'
            onClick={this.handleStart}
          >
            { timer ? 'Parar' : 'Iniciar' }
          </button>
        </section>
      </main>
  )}
}

export default Timer
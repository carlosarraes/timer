import React, { Component } from 'react'
import Timer from './components/Timer'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <Timer />
        <Footer />
      </div>
    )
  }
}

export default App
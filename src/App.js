// Import React and Component
import React, { Component } from 'react';
// Import CSS from App.css
import './App.css';
// Import the Today component to be used below
import Today from './Today/Today'
// Import the History component to be used below
import History from './History/History'

class App extends Component {

    constructor() {
        super();
        this.state = {
            hideInstallButton: true
        }
    }
    componentDidMount() {
        const divInstall = document.getElementById('installContainer');
        const butInstall = document.getElementById('butInstall');

        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('👍', 'beforeinstallprompt', event);
            // Stash the event so it can be triggered later.
            window.deferredPrompt = event;

            this.setState({hideInstallButton:false})
        });
    }

    installButtonClicked(){
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            console.log('The deferred prompt is not available.');
            return;
        }

        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        promptEvent.userChoice.then((result) => {
            console.log('👍', 'userChoice', result);
            // Reset the deferred prompt variable, since
            // prompt() can only be called once.
            window.deferredPrompt = null;
            // Hide the install button.
            this.setState({hideInstallButton:true})
        });
    }

    render() {
    return (
        <div className="">
          <div className="topheader">
            <header className="container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <span className="navbar-item">Cryptocurrencies Prices</span>
                </div>
              </nav>
            </header>
          </div>
          <section className="results--section">
            <div className="container">
              <h1>Cryptocurrencies Prices</h1>
            </div>
            <div className="results--section__inner">
              <Today />
              <History />

                {/*Install button, hidden by default*/}
                <div className="install-button-container" hidden={this.state.hideInstallButton}>
                    <button onClick={this.installButtonClicked}>Install The APP</button>
                </div>

            </div>
          </section>
        </div>
    );
  }
}

export default App;
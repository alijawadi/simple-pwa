import React, {Component} from "react";
import './Today.css';
import axios from 'axios';
import Pusher from 'pusher-js'

class Today extends Component{

    // Adds a class constructor that assigns the initial state values:
    constructor() {
        super();
        this.state = {
            btcprice: '',
            ltcprice: '',
            ethprice: ''
        }
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        // establish a connection to Pusher
        this.pusher = new Pusher('98c33ba884875d9f8b1f', {
            cluster: 'eu',
            encrypted: true
        });
        // Subscribe to the 'CoinsPrice' channel
        this.prices = this.pusher.subscribe('CoinsPrice');

        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
            .then(response => {
                this.setState({ btcprice: response.data.BTC.USD });
                localStorage.setItem('BTC', response.data.BTC.USD);

                this.setState({ ethprice: response.data.ETH.USD });
                localStorage.setItem('ETH', response.data.ETH.USD);

                this.setState({ ltcprice: response.data.LTC.USD });
                localStorage.setItem('LTC', response.data.LTC.USD);
            })
            .catch(error => {
                console.log(error)
            })
    }


    componentDidMount () {

        if (!navigator.onLine) {
            this.setState({ btcprice: localStorage.getItem('BTC') });
            this.setState({ ethprice: localStorage.getItem('ETH') });
            this.setState({ ltcprice: localStorage.getItem('LTC') });
        }

        // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes
        this.prices.bind('prices', price => {
            this.setState({ btcprice: price.prices.BTC.USD });
            this.setState({ ethprice: price.prices.ETH.USD });
            this.setState({ ltcprice: price.prices.LTC.USD });
        }, this);
    }

    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${this.state.btcprice}</h5>
                        <p>1 BTC</p>
                    </div>
                    <div className="column eth--section">
                        <h5>${this.state.ethprice}</h5>
                        <p>1 ETH</p>
                    </div>
                    <div className="column ltc--section">
                        <h5>${this.state.ltcprice}</h5>
                        <p>1 LTC</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today;
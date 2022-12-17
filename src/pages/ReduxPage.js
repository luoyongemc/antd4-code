import React, { Component } from 'react';
import store from '../store';

export default class ReduxPage extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate();
        });
    }

    add = () => {
        store.dispatch({ type: 'ADD' });
    };
    minus = () => {
        // store.dispatch({ type: 'MINUS' });
        store.dispatch((dispatch, getState) => {
            setTimeout(() => {
                dispatch({ type: 'MINUS' });
            }, 1000);
        });
    };

    render() {
        console.log('store', store);
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{store.getState().count}</p>
                <button onClick={this.add}>add</button>
                <button onClick={this.minus}>minus</button>
            </div>
        );
    }
}

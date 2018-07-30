import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from './components/app'
import LoginForm from './components/login-form'
import SignUpForm from './components/signup-form'
import Dashboard from './components/dashboard'
import requireAuth from './components/requireAuth'

// use cookies to track authenticated users back from passport
const networkInterface = createNetworkInterface({
    // same endpoint as express side
    uri: '/graphql',
    // make requests to origin that browser is from
    // safe to send cookies w/ outgoing request
    opts: {
        credentials: 'same-origin'
    }
})

const client = new ApolloClient({
    // use the customized network interface w/ cookies defined above
    networkInterface,
    // graphql always recognizes ids & can keep track
    dataIdFromObject: o => o.id
})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/signup" component={SignUpForm} />
                    <Route path="/dashboard" component={requireAuth(Dashboard)} />
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

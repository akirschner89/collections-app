import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUserQuery from '../queries/current-user'
import { hashHistory } from 'react-router'

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            // with this lifecycle method, call this HOC every time the currentUserQuery updates
            // console.log(!nextProps.data.loading, !nextProps.data.user)
            if (!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push('/login')
            }
        }
        render() {
            // the component we're wrapping is defined in index.js
            // to build out, use component={requireAuth(ComponentName)} within Router
            return <WrappedComponent {...this.props} />
        }
    }

    return graphql(currentUserQuery)(RequireAuth)
}
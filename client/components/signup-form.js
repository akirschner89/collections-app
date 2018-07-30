import React, { Component } from 'react'
import AuthForm from './auth-form'
import mutation from '../mutations/signup'
import { graphql } from 'react-apollo'
import query from '../queries/current-user'
import { hashHistory } from 'react-router'


class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = { errors: [] }
    }
    componentDidUpdate(prevProps) {
        // user wasn't signed in, but now they are in prevProps
        // direct to dashboard component
        if (this.props.data.user && !prevProps.data.user) {
            hashHistory.push('/dashboard')
        }
    } ss
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message)
            this.setState({ errors })
        })
    }
    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(SignUpForm)
)
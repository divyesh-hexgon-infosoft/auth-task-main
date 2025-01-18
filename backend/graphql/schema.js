const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        name: String!
        email: String!
        role: String!
        is_verified: Boolean!
    }

    type AuthData {
        userId: ID!
        token: String!
    }

    type Query {
        login(email: String!, password: String!): AuthData
    }

    type Mutation {
        register(name: String!, email: String!, password: String!, role: String!): String
        verifyEmail(token: String!): String
        forgotPassword(email: String!): String
        resetPassword(token: String!, newPassword: String!): String
    }
`);

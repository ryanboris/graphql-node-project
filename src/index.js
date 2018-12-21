import { GraphQLServer } from 'graphql-yoga'

// Type Definitions (schema)

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// Resolvers

const resolvers = {
    Query: {
        hello() {
            return 'Hello!'
        },

        name() {
            return 'Ryan Boris!'
        },

        location() {
            return 'Philadelphia'
        },

        bio() {
            return 'I love GraphQL!'
        },
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log('Server is running!')
})

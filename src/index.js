import { GraphQLServer } from 'graphql-yoga'

// Type Definitions (schema)

const typeDefs = `
    type Query {
        hello: String!
    }
`

// Resolvers

const resolvers = {
    Query: {
        hello() {
            return 'Hello!'
        },
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

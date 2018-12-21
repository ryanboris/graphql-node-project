import { GraphQLServer } from 'graphql-yoga'

// Type Definitions (schema)

const typeDefs = `
    type Query {
        name: String!
        age: Int!
    }
`

// Resolvers

const resolvers = {
    Query: {
        name() {
            return 'Ryan'
        },
        age() {
            return 33
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

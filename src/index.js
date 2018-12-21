import { GraphQLServer } from 'graphql-yoga'

// Type Definitions (schema)

const typeDefs = `
    type Query {
        id: ID!
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers

const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },

        title() {
            return 'Stuff'
        },

        price() {
            return 27.33
        },

        releaseYear() {
            return 1999
        },

        rating() {
            return 4.33
        },

        inStock() {
            return true
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

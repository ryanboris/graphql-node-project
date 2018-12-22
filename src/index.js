import { GraphQLServer } from 'graphql-yoga'

// Type Definitions (schema)

const typeDefs = `
    type Query {
       me: User!
       post: Post!
    }

    type User {
        id: ID! 
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers

const resolvers = {
    Query: {
        me() {
            return {
                id: '12345',
                name: 'mike',
                email: 'yo@yo.com'
            }
        },

        post() {
            return {
                id: '3333',
                title: 'my post',
                body: 'hey there',
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is running!')
})

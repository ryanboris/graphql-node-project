import { GraphQLServer } from 'graphql-yoga'

// Demo user data
const users = [
    {
        id: '1',
        name: 'Ryan',
        email: 'ryan@example.com'
    },
    {
        id: '2',
        name: 'Shiela',
        email: 'shiela@example.com'
    },
    {
        id: '3',
        name: 'Tootie',
        email: 'tootie@example.com'
    }
]

const posts = [
    {
        id: '1',
        title: 'a post',
        body: 'a body',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'a post',
        body: 'more',
        published: false,
        author: '2'
    },
    {
        id: '3',
        title: 'a post',
        body: 'another',
        published: true,
        author: '3'
    }
]
// Type Definitions (schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        published: Boolean
        author: User! 
        
    }
`

// Resolvers

const resolvers = {
    Query: {
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter(post => {
                return (
                    post.title
                        .toLowerCase()
                        .includes(args.query.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.query.toLowerCase())
                )
            })
        },

        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter(user => {
                return user.name
                    .toLowerCase()
                    .includes(args.query.toLowerCase())
            })
        },

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
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
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

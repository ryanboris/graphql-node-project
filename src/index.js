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
        id: '11',
        title: 'a post',
        body: 'a body',
        published: true,
        author: '2'
    },
    {
        id: '12',
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

const comments = [
    {
        id: '28',
        text: 'asdfe3'
    },
    {
        id: '29',
        text: 'dfgdfgdfgdfg'
    },
    {
        id: '30',
        text: 'lorem ipsummmm'
    },
    {
        id: '31',
        text: 'aads3addsfasfe33333333333'
    }
]
// Type Definitions (schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean
        author: User! 
        
    }

    type Comment {
        id: ID!
        text: String!
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

        comments(parent, args, ctx, info) {
            return comments
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
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
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

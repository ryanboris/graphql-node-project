const message = 'Some message from myModule.js'

const name = 'Ryan'

const location = 'Philadelphia'

const getGreeting = name => {
    return `Welcome to the course ${name}!`
}

export { message, name, getGreeting, location as default }

/**
 * named exports - can have as many as needed
 */

/**
 * default export - no name, only one
 */

export default {
  translation: {
    errors: {
      network: 'Network error',
    },
    form: {
      cancel: 'Cancel',
      submit: 'Send',
      errors: {
        required: 'Required field',
        min: 'At least {{min}} characters',
        max: 'Between {{min}} and {{max}} characters',
        unique: 'Must be unique',
        passwordMatch: 'Passwords must match',
        whitespace: 'Must not contain only whitespaces',
      },
    },
    channels: {
      title: 'Channels',
      newChannel: 'Add new channel',
      removeChannel: 'Remove',
      renameChannel: 'Rename',
      loading: 'Loading...',
      errors: {
        load: 'Failed to load channels',
      },
    },
    messages: {
      loading: 'Loading...',
      noMessages: 'Channel is empty',
      errors: {
        load: 'Failed to load messages',
      },
    },
    nav: {
      logIn: 'Log In',
      logOut: 'Log Out',
    },
    langSelector: {
      description: 'Interface language',
    },
    logIn: {
      title: 'Log In',
      signUpText: 'New to Hexlet Chat?',
      signUpLink: 'Create an account',
    },
    logInForm: {
      username: 'Nickname',
      password: 'Password',
      submit: 'Log In',
      errors: {
        auth: 'Invalid username or password',
      },
    },
    signUp: {
      title: 'Sign Up',
      logInText: 'Already have an account?',
      logInLink: 'Log In',
    },
    signUpForm: {
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      submit: 'Sign Up',
      errors: {
        unique: 'This username already exists',
      },
    },
    newMessageForm: {
      messagePlaceholder: 'Enter message...',
    },
    newChannelModal: {
      title: 'Add channel',
    },
    newChannelForm: {
      namePlaceholder: 'Channel name',
      submit: 'Add',
      errors: {
        unique: 'This channel name already exists',
      },
    },
    removeChannelModal: {
      title: 'Remove channel',
      description: 'Remove channel "{{name}}"?',
    },
    removeChannelForm: {
      submit: 'Remove',
    },
    renameChannelModal: {
      title: 'Rename channel',
    },
    renameChannelForm: {
      namePlaceholder: 'New channel name',
      submit: 'Rename',
      errors: {
        unique: 'This channel name already exists',
      },
    },
  },
};
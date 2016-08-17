// Events - shared config for the different event types.

module.exports = {
  user: {
    join: 'chat:user:join',
    update: 'chat:users:update',
  },

  message: {
    new: 'chat:message:new',
    create: 'chat:messages:create'
  },

  room: {
    load: 'chat:room:load',
    private: 'chat:room:private',
    notify: 'chat:room:notification'
  }
};

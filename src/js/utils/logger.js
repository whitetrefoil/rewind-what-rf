// TODO: Log level control

logger = {
  log: function() {
    return console.log.apply(window, arguments);
  },
  warn: function() {
    return console.warn.apply(window, arguments);
  },
  error: function() {
    return console.error.apply(window, arguments);
  }
};


module.exports = logger;

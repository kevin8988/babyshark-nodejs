const slugify = require('slugify');

module.exports = title => {
  return slugify(`${title}-${Date.now()}`, { lower: true });
};

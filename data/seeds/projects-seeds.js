
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'complete sprint', description: "finish sprint project", complete: 0},
        {name: 'review weeks materials', description: "go over this weeks materials", complete: 1},
        {name: 'preview upcoming materials', description: "go over next weeks materials", complete: 0}
      ]);
    });
};

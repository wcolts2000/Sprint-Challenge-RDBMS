
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {description: 'sample notes desriptions for complete sprint', notes: "come sample notes go here", complete: 0, project_id: 1},
        {description: 'sample notes desriptions for review weeks mats', notes: "come sample notes go here", complete: 1, project_id: 2},
        {description: 'sample notes desriptions for review upcoming mats', notes: "come sample notes go here", complete: 0, project_id: 3}
      ]);
    });
};

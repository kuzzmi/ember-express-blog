import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    markdown: DS.attr('string'),
    slug: DS.attr('string'),
    description: DS.attr('string'),
    dateCreated: DS.attr('date'),
    isPublished: DS.attr('boolean'),
    tags: DS.hasMany('tag', { async: true }),
    project: DS.belongsTo('project', { async: true })
});

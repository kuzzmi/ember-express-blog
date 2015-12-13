import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    url: DS.attr('string'),
    description: DS.attr('string'),
    githubID: DS.attr('number'),
    dateCreated: DS.attr('date'),
    dateUpdated: DS.attr('date'),
    stars: DS.attr('number'),
    isOwner: DS.attr('boolean'),
    isPublished: DS.attr('boolean')
}); 

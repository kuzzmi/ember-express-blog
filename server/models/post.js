var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    body: String,
    description: String,
    slug: String,
    dateCreated: Date
});

/*
 * Creates a slug
 */
function slugify(text) {

    return text
        .toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

/*
 * Transliteration
 */
function translit(text) {
    var letters = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'e',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'j',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sh',
        'ъ': '\'',
        'ы': 'y',
        'ь': '\'',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya'
    };

    var string = '';

    Array.prototype.forEach.call(text.toLowerCase(), function(char) {
        if (letters[char]) {
            string += letters[char];
        } else {
            string += char;
        }
    });

    return string;
}

PostSchema.pre('save', function(next) {
    this.slug = translit(this.title);
    this.slug = slugify(this.slug);
    next();
});

module.exports = mongoose.model('Post', PostSchema);

const person = {
    firstName: 'Lucas',
    occupation: 'Software Developer',
    birthYear: '1970',
    calcAge: function(current_year) {
        this.age = current_year - this.birthYear;
        return this.age;
    },
    getSummary: function() {
        return `${this.firstName} is a ${this.calcAge(2024)}-year old ${this.occupation}`
    }
}

console.log(person.getSummary());
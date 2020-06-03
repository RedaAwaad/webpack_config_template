class App {
    constructor (name, age) {
        this.name = name,
        this.age = age
    }

    logName() {
        return `My name is ${this.name} and I'm ${this.age}`;
    }
}


module.exports = App;
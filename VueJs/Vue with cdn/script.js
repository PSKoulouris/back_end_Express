const app = Vue.createApp({
    data() {
        return {
            studentName: ['Philippe', 'Philippe2'],
            number : 0,
            dynamicPhrase: '',
            address: ''
        }
    },
    methods: {
        increase() {
            console.log("hello wfrom vue :-)"),
             this.number = this.number + 1, // thiscounter ++
             this.dynamicPhrase = `${this.number} Hello from vue`,
             this.address = `${this.number} rue de ${this.studentName[1]} in Luxembourg`
        },
    }
})

app.mount("#app")
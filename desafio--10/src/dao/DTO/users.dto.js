export class UsersDTO{
    constructor(user){
        this.name = user.name
        this.last_name = user.last_name
        this.email = user.email
        this.user = user.user
        this.password = user.password
        this.cart = user.cart
        this.role = user.role
    }
}
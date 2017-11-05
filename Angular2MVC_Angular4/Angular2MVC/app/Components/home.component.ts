import { Component, OnInit } from "@angular/core";
import { UserService } from '../Service/user.service';
import { Global } from '../Shared/global';
import { IUser } from '../Model/user';

@Component({
    template: `<img src="../../images/users.png" style="text-align:center"/>
<br/>
<div name="username">
<label for="username">Username</label>
<input #username type="text" name="username" required />
</div>
<div name="password">
<label for="password">password</label>
<input #password type="password" name="password" required />
</div>
<button (click)="login(username.value,password.value)">Click me!</button>
{{clickMessage}}
 `
})


export class HomeComponent implements OnInit {
    model: any = {};
    clickMessage = '';
    users: IUser[];
    user: IUser;
    msg: string;
    indLoading: boolean = false;
    constructor( private _userService: UserService) { }

    login(username: string, password: string) {
        var usernameIsNotFound = false;
        var passwordIsNotMatch = false;

        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].LastName == username) {
                usernameIsNotFound = true;
                if (password == this.users[i].FirstName) {
                    passwordIsNotMatch = true;
                    this.clickMessage = 'login successfully!';
                    return;
                }
                
            }
        }
        if (usernameIsNotFound == true && passwordIsNotMatch == false) {
            this.clickMessage = 'Incorrect password';

        }
        else if (usernameIsNotFound==false) {
            this.clickMessage = 'Incorrect username';
        }
    }

    ngOnInit(): void {
        
        this.LoadUsers();
    }

    LoadUsers(): void {
        this.indLoading = true;
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.indLoading = false; }
            ,error => this.msg = <any>error);
    }
        
}

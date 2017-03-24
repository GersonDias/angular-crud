import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/throw';

import { User } from '../model/user.model';
import { LoggerService } from '../../common/services/logger.service';

@Injectable()
export class UserService {
    private usersUrl = 'http://localhost:10791/api/users';

    constructor(private http: Http, private logger: LoggerService) { }

    getUsers(): Observable<User[]> {
        this.logger.Log(`Fetching users at ${this.usersUrl}`);
        return this.http.get(this.usersUrl)
            .map(response => response.json().data as User[])
            .catch((error: any) => {
                this.logger.Log(`An error occured: ${error}`);
                return Observable.throw('Something bad happened, see the console.');
            });
    }

    deleteUsers(selectedUsersId: number[]) {
        return this.http.delete(`${this.usersUrl}?ids=${selectedUsersId.join('&ids=')}`)
            .catch((error: any) => {
                this.logger.Log(`An error occured: ${error}`);
                return Observable.throw('Something bad happened when you trying to delete users');
            });
    }

    saveUser(user: User) {
        this.logger.Log('Calling http post to save the user ' + user.Id);

        return this.http.post(this.usersUrl, user)
            .catch((error: any) => {
                this.logger.Log(`An error occured: ${error}`);
                return Observable.throw('Something bad happened');
            });
    }
}

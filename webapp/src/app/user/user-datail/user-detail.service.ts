import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { User } from '../model/user.model';

@Injectable()
export class UserDetailService {
    show: Subject<User> = new Subject();
    edit: Subject<User> = new Subject();
    constructor() { }
}
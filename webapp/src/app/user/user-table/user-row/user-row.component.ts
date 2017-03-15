import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../model/user.model';


@Component({
    moduleId: module.id,
    selector: '[user-row]',
    templateUrl: 'user-row.html'
})
export class UserRowComponent implements OnInit {
    @Input()
    user: User;

    @Output()
    userSelectedEvent = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    userSelected(user: User) {
        this.userSelectedEvent.emit({ user, selected: user.selected });
    }
}
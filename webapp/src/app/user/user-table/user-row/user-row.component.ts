import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../model/user.model';
import { UserDetailService } from '../../user-datail/user-detail.service';
import { UserService } from '../../../user/service/user.service';

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

    @Output()
    userDeletedEvent = new EventEmitter();

    constructor(private userDetailService: UserDetailService, private userService: UserService) { }

    ngOnInit() { }

    userSelected(user: User) {
        this.userSelectedEvent.emit({ user, selected: user.Selected });
    }

    showClicked(user: User) {
        this.userDetailService.show.next(user);
    }

    editClicked(user: User) {
        this.userDetailService.edit.next(user);
    }

    deleteClicked(user: User) {
        if (confirm(`You really want to delete the user ${user.FirstName} ${user.LastName}?`)) {
            this.userService.deleteUsers([user.Id]).subscribe(() => {
                this.userDeletedEvent.emit();
            });
        }
    }
}
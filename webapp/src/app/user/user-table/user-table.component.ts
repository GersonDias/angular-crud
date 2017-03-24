import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { LoggerService } from '../../common/services/logger.service';

import { User } from '../model/user.model';

@Component({
    moduleId: module.id,
    selector: 'user-table',
    templateUrl: 'user-table.component.html'
})

export class UserTableComponent implements OnInit {
    users: User[];
    selectedUsers: User[];
    numberSelectedUsers: number = 0;

    constructor(private userService: UserService, private logger: LoggerService) {
        this.selectedUsers = [];
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.users = undefined;
        this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.logger.Log(`${users}`);
        }, (errorMsg: string) => {
            alert(errorMsg);
        });
    }

    deleteUsers() {
        if (this.selectedUsers) {
            this.userService.deleteUsers(this.selectedUsers.map(x => x.Id)).subscribe(() => {
                this.getUsers();
                this.selectedUsers = [];
                this.numberSelectedUsers = 0;
            }, (errorMSg: string) => {
                alert(errorMSg);
            });
        }
    }

    userSelectedEvent($event: any) {
        this.logger.Log(`${$event.user} - ${$event.selected}`);

        if ($event.user.Selected) {
            this.selectedUsers.push($event.user);
        } else {
            this.selectedUsers.splice(this.selectedUsers.findIndex(x => x.Id === $event.user.Id), 1);
        }
        this.numberSelectedUsers = this.selectedUsers.length;
    }

    userSavedEvent() {
        this.getUsers();
    }

    userDeletedEvent() {
        this.getUsers();
    }
}
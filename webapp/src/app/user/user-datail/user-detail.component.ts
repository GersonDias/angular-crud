import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserDetailService } from './user-detail.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
    moduleId: module.id,
    selector: 'userDetail',
    templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent {
    @Input()
    user: User;

    isEdit: boolean;

    @Output()
    userSavedEvent = new EventEmitter();

    show: boolean;

    private userForm: FormGroup;

    constructor(private userDetailService: UserDetailService, private userService: UserService) {
        this.initFormGroup(new User());

        userDetailService.show.subscribe((user: User) => {
            this.isEdit = false;
            this.initFormGroup(user);
            this.show = true;
        });

        userDetailService.edit.subscribe((user: User) => {
            this.isEdit = true;
            this.initFormGroup(user);
            this.show = true;
        })
    }

    private saveUser(): void {
        this.user.FirstName = this.userForm.controls['firstName'].value;
        this.user.LastName = this.userForm.controls['lastName'].value;
        this.user.Email = this.userForm.controls['email'].value;
        this.user.Country = this.userForm.controls['country'].value;
        this.user.BirthDate = this.userForm.controls['birthDate'].value;
        
        this.userService.saveUser(this.user).subscribe(() => {
            this.userSavedEvent.emit();
        });
    }

    private initFormGroup(user: User): void {
        this.userForm = new FormGroup({
            firstName:  new FormControl(user.FirstName),
            lastName:   new FormControl(user.LastName),
            email:      new FormControl(user.Email),
            country:    new FormControl(user.Country),
            birthDate:  new FormControl(user.BirthDate)
        });
        
        this.user = user;
    }
}
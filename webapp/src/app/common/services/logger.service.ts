import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
    Log(msg: string) {
        console.log(msg);
    }
}
import { Component } from '@angular/core';
import { Auth } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'ping',
    templateUrl: './ping.template.html'
})

export class PingComponent {
    API_URL: string = 'http://localhost:3001';
    message: string;

    constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp) { }

    public ping() {
        this.message = '';
        this.http.get(`${this.API_URL}/ping`)
            .map(res => res.json())
            .subscribe(
            data => this.message = data,
            error => console.log(error)
            );
    }

    public securedPing() {
        this.message = '';
        this.authHttp.get(`${this.API_URL}/secured/ping`)
            .map(res => res.json())
            .subscribe(
            data => this.message = data,
            error => this.message = error._body || error
            );
    }
};
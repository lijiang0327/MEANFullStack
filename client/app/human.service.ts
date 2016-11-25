import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class HumanService {
    constructor(private http: Http) {}
    addHuman(human) {
        var headers = this.setHeader({'Content-Type': 'application/json'});
        return this.http.post('/api/human', JSON.stringify(human), {headers: headers})
                        .map(response => response.json());
    }
    getHumans() {
        return this.http.get('/api/humans').map(response => response.json());
    }
    deleteHuman(id) {
        return this.http.delete('/api/human/' + id).map(response => response.json());
    }
    modifyHuman(id, human) {
        var headers = this.setHeader({'Content-Type': 'application/json'});
        return this.http.post('/api/human/' + id, JSON.stringify(human), {headers: headers})
                        .map(response => response.json());
    }
    setHeader(options) {
        var headers = new Headers();
        if(options) {
            for(var key in options) {
                headers.append(key, options[key]);
            }
        }
        return headers;
    }
}

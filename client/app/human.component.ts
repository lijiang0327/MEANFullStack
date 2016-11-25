import { Component, OnInit } from '@angular/core';

import { HumanService } from './human.service';
import { Human } from './human';

@Component({
    moduleId: module.id,
    selector: 'human',
    templateUrl: './human.component.html',
    providers: [ HumanService ],
    styleUrls: ['human.component.css']
})
export class HumanComponent implements OnInit {
    human = new Human();
    humans: Array<Human> = [];
    modifying: Boolean = false;
    modifyingName: String;
    modifyingAge: String;
    constructor(private humanService: HumanService) {

    }
    ngOnInit() {
        this.getHumans();
    }
    addHuman() {
        var human = this.human;
        this.humanService.addHuman(human)
            .subscribe(data => {
                if(data.status === 200 && data.successful === true) {
                    this.getHumans();
                    this.human.name = '';
                    this.human.age = null;
                }
            }, err => {
                console.log(err);
            });

    }
    deleteHuman(id) {
        this.humanService.deleteHuman(id).subscribe(data => {
            var humans: Array<Human> = [];
            var thisHumans = this.humans;
            if(data.status === 200 && data.successful === true) {
                for(var i = 0, len = thisHumans.length; i < len ; i ++) {
                    if(thisHumans[i].id != id) {
                        humans.push(thisHumans[i]);
                    }
                }
                this.humans = humans;
            }
        });
    }
    modifyHuman(human) {
        var humans = this.humans;
        for(var i = 0 , len = humans.length; i < len ; i++) {
            humans[i].modifying = false;
        }
        human.modifying = true;
        this.modifyingName = human.name;
        this.modifyingAge = human.age;
    }
    getHumans() {
        this.humanService.getHumans().subscribe(data => {
            this.humans = [];
            for(var i = 0 , len = data.length; i < len ; i++) {
                var human = new Human();
                human.name = data[i].name;
                human.age = data[i].age;
                human.id = data[i]._id;
                this.humans.push(human);
            }
        }, err => {

        });
    }
    confirm(human) {
        this.humanService.modifyHuman(human.id, human).subscribe(data => {
            if(data.status == 200 && data.successful == true) {
                human.modifying = false;
            } 
        });
    }
    cancel(human) {
        human.modifying = false;
        human.name = this.modifyingName;
        human.age = this.modifyingAge;
    }   
}
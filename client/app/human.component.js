"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var human_service_1 = require('./human.service');
var human_1 = require('./human');
var HumanComponent = (function () {
    function HumanComponent(humanService) {
        this.humanService = humanService;
        this.human = new human_1.Human();
        this.humans = [];
        this.modifying = false;
    }
    HumanComponent.prototype.ngOnInit = function () {
        this.getHumans();
    };
    HumanComponent.prototype.addHuman = function () {
        var _this = this;
        var human = this.human;
        this.humanService.addHuman(human)
            .subscribe(function (data) {
            if (data.status === 200 && data.successful === true) {
                _this.getHumans();
                _this.human.name = '';
                _this.human.age = null;
            }
        }, function (err) {
            console.log(err);
        });
    };
    HumanComponent.prototype.deleteHuman = function (id) {
        var _this = this;
        this.humanService.deleteHuman(id).subscribe(function (data) {
            var humans = [];
            var thisHumans = _this.humans;
            if (data.status === 200 && data.successful === true) {
                for (var i = 0, len = thisHumans.length; i < len; i++) {
                    if (thisHumans[i].id != id) {
                        humans.push(thisHumans[i]);
                    }
                }
                _this.humans = humans;
            }
        });
    };
    HumanComponent.prototype.modifyHuman = function (human) {
        var humans = this.humans;
        for (var i = 0, len = humans.length; i < len; i++) {
            humans[i].modifying = false;
        }
        human.modifying = true;
        this.modifyingName = human.name;
        this.modifyingAge = human.age;
    };
    HumanComponent.prototype.getHumans = function () {
        var _this = this;
        this.humanService.getHumans().subscribe(function (data) {
            _this.humans = [];
            for (var i = 0, len = data.length; i < len; i++) {
                var human = new human_1.Human();
                human.name = data[i].name;
                human.age = data[i].age;
                human.id = data[i]._id;
                _this.humans.push(human);
            }
        }, function (err) {
        });
    };
    HumanComponent.prototype.confirm = function (human) {
        this.humanService.modifyHuman(human.id, human).subscribe(function (data) {
            if (data.status == 200 && data.successful == true) {
                human.modifying = false;
            }
        });
    };
    HumanComponent.prototype.cancel = function (human) {
        human.modifying = false;
        human.name = this.modifyingName;
        human.age = this.modifyingAge;
    };
    HumanComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'human',
            templateUrl: './human.component.html',
            providers: [human_service_1.HumanService],
            styleUrls: ['human.component.css']
        }), 
        __metadata('design:paramtypes', [human_service_1.HumanService])
    ], HumanComponent);
    return HumanComponent;
}());
exports.HumanComponent = HumanComponent;
//# sourceMappingURL=human.component.js.map
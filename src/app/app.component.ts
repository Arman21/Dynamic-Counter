import { Component , OnInit , OnDestroy} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit , OnDestroy {
    title = 'dynamic-count';
    newCount : number = 0;
    countTitle : string = 'count';
    buttonType : string = 'button';
    buttonTitle1 : string = 'counter +';
    buttonTitle2 : string = 'counter -';
    buttonValue1 : string = 'addThisValue';
    buttonValue2 : string = 'substractValue';
    hiddenText1 : boolean = false;
    hiddenText2 : boolean = false;
    newMessage : string = '';
    timer : any;
    timer2 : any;
    hour : any;
    minute : any;
    seconds : any;
    inputType : string = 'text';
    inputName : string = 'inputFirst';
    byDefault : string = 'Write only user name,age and vocation...';
    inputValue : string = '';
    writeSameTexts : boolean = true;
    hidden : boolean = false;
    userCount : number = 0;
    checkArray : Array<any>= [];  
    information : string = 'user info'; 
    click : number = 1;
    userNumber : number = 0;
    inputTitle : string = 'Write your dates!';
    userArray : Array<any> = [];
    iconTitle : string = 'Remove';
    isTrue : boolean = false;

    constructor() {

    }

    ngOnInit() {
        if (localStorage.count1 != null) {
            let count1 = JSON.parse(localStorage.getItem('count1'));
            this.newCount = count1;
        }
        if (localStorage.count2 != null) {
            let count2 = JSON.parse(localStorage.getItem('count2'));
            this.userNumber = count2;
        }
        if (localStorage.givenDate != null) {
            let checkArray = JSON.parse(localStorage.getItem('givenDate'));
            this.checkArray = checkArray;
            this.hidden = true;
        }
    }

    ngOnDestroy() {
        localStorage.removeItem('count1');
        localStorage.removeItem('count2');
        localStorage.removeItem('givenDate');
    }

    showMessage() {
        this.hiddenText1 = true;
        this.newMessage = 'Message : The given value can not be more than 150 !';
        let newTimer = setTimeout(() => {
            this.hiddenText1 = false;
            this.newCount = 0;
        },3000);
    }
    showNewMessage() {
        this.hiddenText2 = true;
        this.newMessage = 'Message : The given value can not be less than 0 !';
        let newTimer = setTimeout(() => {
            this.hiddenText2 = false;
            this.newCount = 0;
        },3000);
    }
    addValue() {
        this.timer=setInterval(() => {
            if (this.newCount < 150) {
                this.newCount++;
                if (this.newCount == 150) {
                    clearInterval(this.timer);
                    this.showMessage();
                }
            }
        },50);
    }
    stopValue() {
        setTimeout(() => {
            clearInterval(this.timer);
            localStorage.setItem('count1',JSON.stringify(this.newCount));
        },0);
    }
    subValue() {
        this.timer=setInterval(() => {
            if (this.newCount > 0) {
                this.newCount--;
                if (this.newCount == 0) {
                    clearInterval(this.timer);
                    this.showNewMessage();
                }
            }
        },50);
    }
    plusValue() {
        if (!this.isTrue) {
            this.timer2=setInterval(() => {
                this.newCount++;
                if (this.newCount == 150) {
                    clearInterval(this.timer2);
                }
            },1000);
            this.isTrue = true;
        }
        else {
            clearInterval(this.timer2);
            this.isTrue = false;
            localStorage.setItem('count1',JSON.stringify(this.newCount));
        }
    }
    minusValue() {
        if (!this.isTrue) {
            this.timer2=setInterval(() => {
                this.newCount--;
                if (this.newCount == 0) {
                    clearInterval(this.timer2);
                }
            },1000);
            this.isTrue = true;
        }
        else {
            clearInterval(this.timer2);
            this.isTrue = false;
            localStorage.setItem('count1',JSON.stringify(this.newCount));
        }
    }
    public time = setInterval(() => {
        let date = new Date();
        this.hour = date.getHours().toString();
        if (this.hour.length < 2) {
            this.hour = '0' + this.hour;
        }
        this.minute = date.getMinutes().toString();
        if (this.minute.length < 2) {
            this.minute = '0' + this.minute;
        }
        this.seconds = date.getSeconds().toString();
        if (this.seconds.length < 2) {
            this.seconds = '0' + this.seconds;
        }
    },1000);
    addADiv(input) {
        if (input.value != '') {
            let some = this.inputValue.split(",");
            this.userArray.push(some);
            let currentObject = {
                innerName : this.userArray[0][0],
                innerAge : this.userArray[0][1],
                innerVocation : this.userArray[0][2],
                done : true
            };
            this.checkArray.push(currentObject);
            localStorage.setItem('givenDate',JSON.stringify(this.checkArray));
            this.hidden = true;
            this.userNumber++;
            localStorage.setItem('count2',JSON.stringify(this.userNumber));
            input.value = '';
            this.inputValue = '';
            this.userArray.splice(0);
        }
    }
    incrementDecrement() {
        if (this.click == 1) {
            this.newCount++;
            if (this.newCount == 15) {
                this.click = 2;
            }
        }
        else {
            this.newCount--;
            if (this.newCount == 0) {
                this.click = 1;
            }
        }
    }
    addBorder(elem) {
        elem.style.border = "2px solid #06abdd";
    }
    subBorder(elem) {
        elem.style.border = "1px solid #000";
    }
    deleteDiv(index) {
        this.checkArray.splice(index,1);
        this.userNumber--;
        localStorage.setItem('count2',JSON.stringify(this.userNumber));
        localStorage.setItem('givenDate',JSON.stringify(this.checkArray));
    }
}

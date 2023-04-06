
let twoSlices = [];

let adım = 0;
let puan = 0;



function startGame(){
    
    var imageContainers = document.getElementsByClassName("image-container");
    var arr = [];
       
    while(arr.length < 16){
        var randomNum = Math.floor(Math.random() * 16)+1;
        if(arr.indexOf(randomNum) === -1) arr.push(randomNum);
        
    }

    for (var i = 0; i < 16; i++) {
            
        imageContainers[i].style.order = arr[i];
        firstll.insertAtIndex(imageContainers[i],i);
        if (i === 0) {
            randomll.insertFirst(imageContainers[arr.indexOf(1)]);
        }
        else{
            randomll.insertLast(imageContainers[arr.indexOf(i+1)]);
        }
    }
    clickImage();
}

function clickImage (){
    let allImages = document.getElementsByClassName("image-container");
    for ( const slice of allImages) {
        slice.addEventListener("click", replaceImage);
        
    }
}

function replaceImage (){
    
    if (checkControll(randomll.findIndex(this)) == false ) {
        this.style.border = "2px solid red";
        twoSlices.push(this);
        if (twoSlices.length === 2) {
            
            let order1 = parseInt(window.getComputedStyle(twoSlices[0]).getPropertyValue("order"));
            let order2 = parseInt(window.getComputedStyle(twoSlices[1]).getPropertyValue("order"));

            twoSlices[0].style.order = order2;
            twoSlices[1].style.order = order1;
            twoSlices[0].style.border = "none";
            twoSlices[1].style.border = "none";

            randomll.swap(randomll.findIndex(twoSlices[0]),randomll.findIndex(twoSlices[1]));

            console.log(checkControll(randomll.findIndex(twoSlices[0])));

            if (checkControll(randomll.findIndex(twoSlices[0]))) {
                puan=puan + 10;
                
            }
            else{
                puan=puan-5;
            }
            adım++;
            document.getElementById("score").innerHTML = puan;
            document.getElementById("step").innerHTML = adım;
            

            twoSlices = [];
        }
    }
   
    
    
}

function checkControll (index){

    var dogru = false;
    for (let i = 0; i < 16; i++) {
        if(randomll.findValueByIndex(index) === firstll.findValueByIndex(i) && index === i){
            dogru = true;
        }
    }
    return dogru;

}

function checkwin() {
    var win = false;
    for (let i = 0; i < 16; i++) {
        if(randomll.findValueByIndex(i) === firstll.findValueByIndex(i)){
            win = true;
        }
        else{
            win = false;
        }
    }
    return win;
}


class Node {
    constructor(value , next = null) {
        this.value = value;
        this.next = next;
    }
}


class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    

    insertFirst(value) {
        this.head = new Node(value, this.head , this.head );
        this.size++;
    }


    insertLast(value) {
        let node = new Node(value);
        let current;
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        
        this.size++;
    }

    printListData() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
    insertAtIndex(value, index) {
        if (index > 0 && index > this.size) {
            return;
        }
        if (index === 0) {
            this.insertFirst(value);
            return;
        }
        const node = new Node(value);
        let current, previous;
        current = this.head;
        let count = 0;
        while (count < index) {
            previous = current;
            count++;
            current = current.next;
        }
        node.next = current;
        previous.next = node;
        this.size++;
    }

    findIndex(value) {
        let current = this.head;
        let count = 0;
        while (current != null) {
            if (current.value === value) {
                return count;
            }
            count++;
            current = current.next;
        }
    }

    findValueByIndex(index) {
        let current = this.head;
        let count = 0;
        while (current != null) {
          if (count === index) {
            return current.value;
          }
          count++;
          current = current.next;
        }
    }

    swap(index1, index2) {
        if (index1 < 0 || index1 >= this.size || index2 < 0 || index2 >= this.size) {
          return;
        }
    
        if (index1 === index2) {
          return;
        }
    
        let node1 = this.head;
        let node2 = this.head;
        let prev1 = null;
        let prev2 = null;
    
        for (let i = 0; i < index1; i++) {
          prev1 = node1;
          node1 = node1.next;
        }
    
        for (let i = 0; i < index2; i++) {
          prev2 = node2;
          node2 = node2.next;
        }
    
        if (prev1 !== null) {
          prev1.next = node2;
        } else {
          this.head = node2;
        }
    
        if (prev2 !== null) {
          prev2.next = node1;
        } else {
          this.head = node1;
        }
    
        let temp = node1.next;
        node1.next = node2.next;
        node2.next = temp;
    }
    

}

const firstll = new LinkedList();
const randomll = new LinkedList();
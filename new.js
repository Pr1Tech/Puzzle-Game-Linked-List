window.addEventListener('load',karıstır);
let twoSlices = [];


function karıstır (){
    var imageContainers = document.getElementsByClassName("image-container");
    var orderValues = {}; // "order" değerlerini saklamak için bir obje oluşturulur

    for (var i = 0; i < imageContainers.length; i++) {
        var randomOrder;
        do {
            randomOrder = Math.floor(Math.random() * 16) + 1; // 1 ile 16 arasında bir rastgele sayı oluşturulur
        } while (orderValues[randomOrder]); // Eğer rastgele sayı zaten objenin içinde varsa, yeni bir rastgele sayı oluşturulur

        orderValues[randomOrder] = true; // "order" değeri objeye eklenir
        imageContainers[i].style.order = randomOrder; // Her bir div elementine rastgele bir "order" değeri atar
        ll.insertAt(imageContainers[i], i);
    }
    
    
    startGame();
}

function startGame (){
    imageClick();
}

function imageClick (){
    let allImages = document.getElementsByClassName("image-container");
    for ( const slice of allImages) {
        slice.addEventListener("click", orderDegistir);
        
    }
}





function orderDegistir () {
    this.style.border = "2px solid red";
    twoSlices.push(this);
    if (twoSlices.length === 2) {
        
        let order1 = window.getComputedStyle(twoSlices[0]).getPropertyValue("order");
        let order2 = window.getComputedStyle(twoSlices[1]).getPropertyValue("order");

        twoSlices[0].style.order = order2;
        twoSlices[1].style.order = order1;
        twoSlices[0].style.border = "none";
        twoSlices[1].style.border = "none";

        
        
        ll.changeDataIndex(ll.findIndex(twoSlices[0]), twoSlices[1]);
        ll.changeDataIndex(ll.findIndex(twoSlices[1]), twoSlices[0]);
       
        twoSlices.length = 0;
        ll.printListData();
        console.log("****");

    }
    
}

function checkWin () {
    
    for (let index = 0; index < ll.length; index++) {
        let value = ll.findValueByIndex(index);
        console.log("value: " + value.style.order);
        console.log("index: " + value.getElementById(index).style.order);
        if(value.style.order === value.getElementById(index).style.order){
            console.log("win");
        }
        
    }
}



class Node {
    constructor(value, next = null) {
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
        this.head = new Node(value, this.head);
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

    insertAt(value, index) {
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
        while (current) {
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
        return null;
    }

    


    clearList() {
        this.head = null;
        this.size = 0;
    }

    printListData() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    changeDataIndex(index, value){
        
        let current = this.head;
        let count = 0;
        while (current) {
            if (count == index) {
                current.value = value;
            }
            count++;
            current = current.next;
        }
        return null;
    }


}

const ll = new LinkedList();


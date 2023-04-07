
let twoSlices = [];

let adım = 0;
let puan = 0;


// Görsel dosyasını yükleme
var imageInput = document.getElementById("imageInput");
var starterGame = document.getElementById("start-game");
imageInput.addEventListener("change", function() {
  var img = new Image();
  img.src = URL.createObjectURL(imageInput.files[0]);
  img.onload = function() {
    // Görselin boyutunu değiştirme
    imageInput.style.display = "none";
    starterGame.style.display = "none";
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 800;
    ctx.drawImage(img, 0, 0, 800, 800);

    // Görseli 16 parçaya bölme
    var tileSize = 200;
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 4; x++) {
        var tileCanvas = document.createElement("canvas");
        tileCanvas.width = tileSize;
        tileCanvas.height = tileSize;
        var tileCtx = tileCanvas.getContext("2d");
        tileCtx.drawImage(canvas, x*tileSize, y*tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);

        var tileDiv = document.createElement("div");
        tileDiv.className = "image-container"
        tileDiv.style.width = tileSize + "px";
        tileDiv.style.height = tileSize + "px";
        tileDiv.style.backgroundImage = "url(" + tileCanvas.toDataURL() + ")";
        document.getElementById("main-container").appendChild(tileDiv);
        document.getElementById("main-container").style.display = "flex";
        document.getElementById("karistir").style.display = "flex";
        document.getElementById("main").style.justifyContent = "space-around";
      }
    }
    alert("Oyunu başlatmak için karıştır butonuna basınız");
  }
});

function startGame(){
    
    document.getElementById("karistir").style.display = "none";
    document.getElementById("score-board").style.display = "flex";
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

function newGame() {
    location.reload();
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
    if (checkwin()===true) {
        alert("Tebrikler oyunu kazandınız");
        document.getElementById("save-score").style.display = "flex";
        document.getElementById("yeniOyun").style.display = "flex";
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
        else if (randomll.findValueByIndex(i) !== firstll.findValueByIndex(i)) {
            win = false;
            break;
        }
            
    }
    return win;
}

function saveScore() {
    const name = document.getElementById("name").textContent;
    const score = document.getElementById("score").textContent;
    const step = document.getElementById("step").textContent;
    
    // Create an object with the data
    const data = { createdBy: name, score: score, adım: step };
    
    // Send the data to the server using fetch()
    fetch('https://puzzle-game-backend-linkedlist.herokuapp.com/score/create-score', {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // Handle the response from the server
      console.log(response);
    })
    .catch(error => {
      // Handle any errors that occur
      console.error(error);
    });
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
# KARE PUZZLE OYUNU

Bağlı liste kullanılarak puzzle parçalaranı eşleştirmesi yapılmıştır.

## Kurulum

Repodan cloneladığınızda proje çalışırtırmak için ekstra bir kurulum yapmanız gerekmez. Backend dosyaları halihazırda canlıdadır. Backend reposu <https://github.com/BerkanN1/Puzzle-Game-Linked-List-Backend>

## Proje
Projemiz bir resmi 16 parçaya bölerek bu parçaları rastgele bir şekilde dağıtır. Kullanıcı ilk önce yerini değiştireceği görseli seçer daha sonra gideceği yerdeki görseli seçer. Görselin konumu doğru ise görsel kilitlenir ve değiştirilemez.

## Kullanılan Teknolojiler
Projemiz web tabanlı geliştirilmiştir. Html, javascript ve css kullanılmıştır. Backend işlemleri için ise node.js kullanılmıştır.

## Bağlı liste yapısı

```javascript

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
 }
```

## Parçaların eşleşmesi
```javascript

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
 function checkControll (index){

    var dogru = false;
    for (let i = 0; i < 16; i++) {
        if(randomll.findValueByIndex(index) === firstll.findValueByIndex(i) && index === i){
            dogru = true;
        }
    }
    return dogru;

 }

```
## Oyun kuralları


Her doğru hamle +5 puan, her yanlış hamle ise -10 puan.

Kullanıcı ilk olarak gitmesi gereken (doğru olduğunu düşündüğü) parçanın üzerine
tıklayıp, daha sonra gideceği konumdaki parçanın üzerine tıklayarak parçaların yer
değiştirmesini sağlayacaktır. 

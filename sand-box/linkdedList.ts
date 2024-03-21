class MyNode<T> {
    next: MyNode<T> = null;
    value: T

    constructor(value: T) {
        this.value = value;
    }
}
class LinkedList<T> {
    head: MyNode<T>;
    tail: MyNode<T>;
    length: number;

    constructor() {
        this.head =  null;
        this.tail = null;
        this.length = 0;

    }
    append(val: T):void{
        let tmp: MyNode<T> = new MyNode<T>(val);

        if (!this.head){
            this.head = tmp;
            this.tail = tmp;
        } else {
            this.tail.next = tmp;
            this.tail = tmp;
        }
        this.length++;
    }
    printAll(){
        let current = this.head;
        if (current == null){ return; }
        for (let i = 0; i<this.length; i++){
            console.log(current.value);
            current = current.next;
        }

    }

    printLength() {
        console.log("linkedList length = ", this.length);
    }

    removeAtPosition(position: number) {
        let current: MyNode<T> = this.head;
        if (position < 0 || position > this.length || current == null){
            console.log("wrong position");
            return;
        }
        for (let i = 1; i < position; i++){
            current = current.next;
        }
        // so you want to remove the next node, then you point current node, to the next next.
        current.next = current.next.next;
        this.length--;


    }
}

let myLinkedList = new LinkedList();
myLinkedList.append(10);
myLinkedList.append(20);
myLinkedList.append(30);
myLinkedList.printAll();
myLinkedList.printLength();
myLinkedList.removeAtPosition(1);

console.log("after remove");
myLinkedList.printAll();
myLinkedList.printLength();


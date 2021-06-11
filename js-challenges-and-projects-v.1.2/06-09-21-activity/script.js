class Store {
    constructor(storeName, inventory, earnings){
        this.storeName = storeName
        this.inventory = inventory
        this.earnings = earnings
    }
    // restocks the existing product in the list
    restockProduct(productName, quantity) {
        // checks if the product is existing in the list
        this.inventory.find(product => {
        if(product.productName === productName){
            product.quantity += quantity
        }})
    }
    // displays the total earnings 
    totalEarnings() {
        console.log(`${this.storeName} Total Earnings:${this.earnings}`)
    }
    // displays what products are availabe, its current inventory, and its value
    displayList() {
        this.inventory.map(product => {
        console.log(`${this.storeName} Inventory: ${product.productName}, ${product.quantity}, ${product.value}`)
        })
    }   
}

class SubStore extends Store {
    constructor(name, list, earnings, parentStore){
        super(name, list, earnings)
        this.parentStore = parentStore
      
    }
    // new product is pushed in the list array
    // same as addBook
    newProduct(productName, quantity, value) {
        let newItem1 = new NewItem(productName, quantity, value)
        this.inventory.push(newItem1)
        this.parentStore.inventory.push(newItem1)
    }
    // sells a product if it's existing in the list and the quantity in the list is > the quantity to be sold
    sellProduct(productName, quantity) {
        // checks if the product is existing in the list
        let result = this.inventory.find(product => product.productName === productName);
        if(result !== undefined){
            if(result.quantity >= quantity){
                result.quantity -= quantity
                this.earnings += result.value * quantity
                this.parentStore.earnings += this.earnings // not sure here pwede pa i refactor
                console.log(`Transaction Successful`)
            }else{
                console.log(`Sorry! We only have ${result.quantity} copies of ${result.productName} left`)
            }
        }else{
            console.log(`Sorry! We don't sell "${productName}" here`);
        }
    }
    
}

class NewItem{
    constructor(productName, quantity, value){
        (this.productName = productName),
        (this.quantity = quantity),
        (this.value = value)
    }
}

let mainStore = new Store("Main-Store", [], 0)
let laptopStore = new SubStore("Laptop-store", [], 0, mainStore)
let bookStore = new SubStore("Book-store", [], 0, mainStore)
let fruitStore = new SubStore("Fruit-stand", [], 0, mainStore)

laptopStore.newProduct("ASUS", 10, 200)
laptopStore.newProduct("Lenovo", 10, 200)
laptopStore.restockProduct("ASUS", 1)
laptopStore.sellProduct("ASUS", 11)
laptopStore.totalEarnings()
laptopStore.displayList()

bookStore.newProduct("Cinder", 10, 200)
bookStore.newProduct("Harry Potter", 10, 200)
bookStore.restockProduct("Cinder", 1)
bookStore.sellProduct("Harry Potter", 2)
bookStore.totalEarnings()
bookStore.displayList()

fruitStore.newProduct("Apple", 10, 50)
fruitStore.newProduct("Mango", 10, 30)
fruitStore.restockProduct("Apple", 1)
fruitStore.sellProduct("Mango", 2)
fruitStore.totalEarnings()
fruitStore.displayList()
 
mainStore.totalEarnings()

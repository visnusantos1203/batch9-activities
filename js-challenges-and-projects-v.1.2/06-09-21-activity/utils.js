
export const mixins  = {
    // finds for a product inside inventory
    finder(productName, inventory){
        return inventory.find(product => product.productName === productName)
    },
    newStoreMessage(storeName){
        console.log(`Congratulations! A new store "${storeName}" has been created`)
    },
    restockMessage(productName, quantity){
        console.log(`Successfully added ${quantity} ${productName}`)
    },
    addProductMessage(productName, storeName){
        console.log(`${storeName}New product "${productName}" is added to the inventory`)
    },
    sellProductMessage(productName, quantity, inventory){
        let result = this.finder(productName, inventory);

        if(result !== undefined){
            if(result.quantity >= quantity){
                console.log(`Transaction Successful! ${quantity} ${productName} sold`)
            }else{
                console.log(`Sorry! We only have ${result.quantity} copies of ${result.productName} left`)
            }
        }else{
            console.log(`Sorry! We don't sell "${productName}" here`);
        }
    },
    totalEarningsMessage(storeName, earnings){
        console.log(`${storeName} Total Earnings:${earnings}`)
    },
    displayListMessage(storeName, inventory){
        inventory.map(product => {
            console.log(`${storeName} Inventory: ${product.productName}, ${product.quantity}, ${product.value}`)

        })
    }
}        

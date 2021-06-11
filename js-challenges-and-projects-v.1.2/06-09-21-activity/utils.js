/* - create a mixin file that can be imported by other js files
- this mixin file can show messages of
  - add
  - sell
  - restock
  - errors
  - etc
- this mixin file can find specific item of the store
 */

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
    addProductMessage(productName){
        console.log(`New product "${productName}" is added to the inventory`)
    },
    sellProductMessage(productName, quantity, inventory){
        let result = this.finder(productName, inventory); //mixins.finder(productName)

        if(result !==undefined){
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

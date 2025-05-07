import { orderbook,Order } from "./orderBook";


interface User extends Order{
    uuid:string
    inAccountMoney:string
    orderPlaced:Order[]
}

export class Market{
    user:User[]

    constructor(){
        this.user=[]
    }

    createUser(data:User){
        this.user.push(data)
    }

    marketOrderFill(data:Order){
        // basically check kitni quantity padi h
    }

    limitOrderFill(data:User){
        // now start filing from the mini cost avail 
        // upto the limit that has been set ki 100 chahiye lekin 10 se upr h toh wait krlunga
        this.userChecker(data)
        const relevantAsks=orderbook.asks.filter(order=>order.stockName===data.stockName).sort((a, b) => Number(a.price) - Number(b.price));
        // TO-DO - DO UNDERSTAND THIS SORTING

        for(let i=0;i<relevantAsks.length;i++){
            const asks=relevantAsks[i]
            const quantity=Number(asks.quantity)
            const price=Number(asks.price)

            const requiredQty = Number(data.quantity);
            const tradeQty = Math.min(requiredQty, quantity);
            const  totalCost=quantity*price
            
            let user = this.user.find(u => u.uuid === data.uuid);
            
            if (!user) throw new Error("User not found");
            
            let balance=Number(user.inAccountMoney)
            
            if(balance<totalCost){
                throw new Error("dont have enough balance")
            }
            
            user.inAccountMoney = (Number(user.inAccountMoney) - totalCost).toString();
            // update balances and then slice
            asks.quantity=(quantity-tradeQty).toString()
            data.quantity=(requiredQty-requiredQty).toString()

            if (Number(asks.quantity) === 0) {
                const index = orderbook.asks.indexOf(asks);
                if (index > -1) orderbook.asks.splice(index, 1);
            }
        }
        

    }

    userChecker(data:User){
        if(this.user.find((e)=>{
            e.uuid===data.uuid
        })){
            // i can add it here as well
            return true;
        }else{
            return false;
        }
    }

}



export interface Order{
    price:string
    stockName:string
    quantity:string
    timeOfExecution:Date
    
}

interface asks extends Order{
    side:"asks"
}

interface bids extends Order{
    side:"bids"
}

export interface OrderBook{
    bids:bids[]
    asks:asks[]
}

export const orderbook: OrderBook = {
    bids: [
      
    ],
    asks: [
      
    ]
  }

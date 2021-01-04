export const addItemToCart = (cartItems, ItemToBeAdded) => {
    const existingCartItem  = cartItems.find(
        cartItem => cartItem.id === ItemToBeAdded.id
    )

    if(existingCartItem){
        return cartItems.map(
            cartItem => cartItem.id === ItemToBeAdded.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    
    }

    return [...cartItems, {...ItemToBeAdded, quantity: 1}]
}
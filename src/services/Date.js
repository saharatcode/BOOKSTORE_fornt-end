export const date = (createdAt) => {

    const date = new Date(createdAt)
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const orderDate  = date.toLocaleDateString("en-GB", options)
    return orderDate;
}

export const dateOfReceipt = (createdAt) => {
    const date = new Date(createdAt).toString()
    // console.log(date)
}
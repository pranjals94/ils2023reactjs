

//Regturns for the cssclass for payment status
export const getPaymentStatusCssClass = (status) => {
    if (status == "ON HOLD") {
        return 'badge text-bg-danger'
    } else if (status == "COMPLETE") {
        return 'badge text-bg-success'
    } else if (status == "INCOMPLETE") {
        return 'badge text-bg-warning'
    } else if (status == "PROCESSING") {
        return 'badge text-bg-info'
    } else if (status == "FAILED") {
        return 'badge text-bg-dark'
    }
}


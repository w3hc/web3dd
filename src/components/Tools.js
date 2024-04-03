export function truncAddress(address, beginLen, endLen, separator)  {
	if(address === undefined || address === null) return "";
    return address.substring(0, beginLen) + separator + address.substring(address.length - endLen);
}

export function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// return string with only 6 numbers
// amount string
export function amountCent(amount)  {
    let strAmount = amount.toString();
    if(strAmount.indexOf('.') === (-1)) {
        return strAmount;
    }
    if (strAmount.length < 7) strAmount += "0000000";
    return strAmount.substring(0, strAmount.indexOf('.')) + "." + strAmount.substring(strAmount.indexOf('.')+1,6-strAmount.indexOf('.')+strAmount.indexOf('.')+1);
}

export function formatSize(value)  {
    let formatedSize = value + " bytes";
    if (value > 1024) {
        formatedSize = Math.floor(value / 1024) + " Kb";
    }
    if (value > (1024**2)) {
        formatedSize = Math.floor(value / (1024**2)) + " Mb";
    }
    if (value > (1024**3)) {
        formatedSize = Math.floor(value / (1024**3)) + " Gb";
    }
    return formatedSize;
}

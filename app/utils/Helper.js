export function separateWithCommas(x) {                                                
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");                  
}                                                                               


export function separateWithCommasTwoDecimals(x) {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");                  
}
                                                                                
                                                                                
export function separateWithDots(x) {                                                  
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");                  
}                                                                               
                                                                                
                                                                                
export function swapCommaWithDot(x) {                                                  
  return x.toString().replace(/\./g, '|').replace(/\,/g, '.').replace(/\|/g, ',');
}                                                                               

                                                                                
export function removeDotSeparator(x) {                                                
  if (typeof x === "string") {                                                  
    return x.replace(/\./g, '');                                                
  }                                                                             
                                                                                
  return x;                                                                     
}
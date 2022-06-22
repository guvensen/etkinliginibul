export const dateFormat = (date) =>{
    let d = date;

    if(typeof date === "string"){
        d = new Date(date.replace(/-/g, "/"));
    }

    const year          = d.getFullYear();
    const month         = ("0"+(d.getMonth() + 1)).slice(-2);
    const day           = ("0"+d.getDate()).slice(-2);

    return year+"-"+month+"-"+day;
}

const setDateFormat = d => {
    //yyyy-MM-ddThh:mm
    const date = new Date(Date.parse(d));
    const y = date.getFullYear();
    const m = ('' + (date.getMonth() + 1)).padStart(2, '0');
    const day = ('' + date.getDate()).padStart(2, '0');
    const h = ('' + date.getHours()).padStart(2, '0');
    const min = ('' + date.getMinutes()).padStart(2, '0');
    const out = y + '-' + m + '-' + day + 'T' + h + ':' + min;
    return out;
}

export default setDateFormat
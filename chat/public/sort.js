// order by child
animeRef.orderByChild("nama").on("value", (items)=>{
    console.log(items.val());
    let html = "";
    items.forEach((item) => {
        let row = item.val();
        html += "<li class='list-group-item'>"+row.nama+" - "+row.genre+"</li>";
        console.warn(item.val());
    });
    document.getElementById('sortChild').innerHTML = html;
})


// order by value
ratingRef.orderByValue().on("value", (items)=>{
    console.log(items.val());
    let html = "";
    items.forEach((item) => {
        html += "<li class='list-group-item'>"+item.key+" - "+item.val();+"</li>";
        console.warn(item.val());
    });
    document.getElementById('sortValue').innerHTML = html;
})


// order by value
ratingRef.orderByKey().on("value", (items)=>{
    console.log(items.val());
    let html = "";
    items.forEach((item) => {
        html += "<li class='list-group-item'>"+item.key+" - "+item.val();+"</li>";
        console.warn(item.val());
    });
    document.getElementById('sortKey').innerHTML = html;
})



animeRef.on("value",showData, showError)
animeRef.on("child_added", function (items) {
    console.log("child ditambahkan");
    console.log("child_added ", items.val());
})

// event change
animeRef.on("child_changed", (items)=>{
    console.log("child_changed", items.val());
})

// event child hapus
animeRef.on("child_removed", (items)=>{
    console.log("child_removed", items.val());
})

function showData(items) {
    console.log(items.val());
}

function showError(err) {
    console.error(err);
}

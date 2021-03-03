let refUser = db.ref("user");

// show listData
refUser.on("value", (items)=>{
    let html = "";
    items.forEach((item) => {
        let td = "<td>"+item.key+"</td>";
            td += "<td>"+item.val().name+"</td>";
            td += "<td>"+item.val().divisi+"</td>";
            td += "<td><a class='btn btn-success btn-sm' data-user='"+JSON.stringify(item)+"' data-id='"+item.key+"' onclick='btnEdit.call(this)'> <i class='icofont-edit'></i> edit </a> <button class='btn btn-danger btn-sm' data-id='"+item.key+"' onclick='btnRemove.call(this)'> <i class='icofont-ui-delete'></i> delete </button></td>";
        html += "<tr>"+td+"</tr>"
    });

    document.getElementById('listData').innerHTML = html;
})


// proses tambah
$("#formTambah").submit(function (e) {
    e.preventDefault();
    let name = document.getElementById('nama').value;
    let divisi = document.getElementById('divisi').value
    if (name === "" || divisi === "") {
        Swal.fire("Error", "Form not complete", "error");
    }else{
        let keyId = refUser.push({
            name : name,
            divisi: divisi
        }).key;

        console.warn("create", keyId);
        $("#myModal").modal("hide")
        this.reset();
    }
})

// proses delete
function btnRemove(){
    Swal.fire({
        title : "Warning",
        text : "Are you sure to delete this ?",
        icon : "warning",
        showCancelButton : true
    }).then(({ isConfirmed })=>{
        if (isConfirmed) {
            let id  = $(this).data("id");
            refUser.child(id).remove();
        }
    })
}

function btnEdit() {
    let id = $(this).data("id");
    let nama = $(this).data("user").name;
    let divisi = $(this).data("user").divisi;

    $("#myModal").modal("show")
    console.log();
}


// tambah event notif
refUser.on("child_added", (items)=>{
    console.warn("added", items.val());
})

refUser.on("child_changed", (items)=>{
    console.warn("changed", items.val());
    Swal.fire("Success","Data berhasil diperbarui","success")
})

refUser.on("child_removed", (items)=>{
    console.warn("removed", items.val());
    Swal.fire("Success","Data berhasil dihapus","success")
})

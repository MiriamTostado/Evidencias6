const cargarTipos = async()=>{
    try{
        const url = "https://netnr-proxy.herokuapp.com/201.140.116.237/services/tipo.php"
        await axios 
        .get(url)
        .then((res)=>{
            llenarcombos(res.data)
        })
        .catch((err)=>{
            console.log("ERROR" +err);
            return false;
        })
    }catch{console.log("ERROR");
     return false;
}
    return true;
}
function llenarcombos(data){

    for(let item of data){
        document.getElementById('tipo').innerHTML += `
        <option value ="${item.tipo}">${item.descripcion}</option>
        `
    }
    document.getElementById('tipo').innerHTML+=`
    </select>
    `
};
const cargarTablaVentas=async()=>{
    try{
     const url = "https://netnr-proxy.herokuapp.com/201.140.116.237/services/ventas.php"
    await axios 
    .get(url)
    .then((res)=>{
        dibujarTabla(res.data);
    })
    .catch((err)=>{
        console.log("ERROR" +err);
        
    })

}catch{console.log("ERROR")}

}

function dibujarTabla(data){
let tipo = document.getElementById("tipo").value;
document.getElementById("ventas").innerHTML=``

for(let item of data){

    if(item.tipo == tipo){
        document.getElementById("ventas").innerHTML+=`
        <tr>
        <td>${item.folio}</td>
        <td>${item.tipo}</td>
        <td>${item.precio}</td>
        <td>${item.descuento}</td>
        <td>${item.total}</td>
        <td>${item.fechapago}</td>
        <td>${item.giro}</td>
    </tr>
        `
    }
}
}



const inicia=async()=>{
    if(await cargarTipos() == true){
        cargarTablaVentas();
    }

    document.getElementById("tipo").addEventListener("change",async()=>{
    cargarTablaVentas();
    
});
    
}


inicia();
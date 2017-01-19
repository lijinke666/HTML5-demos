function $(id){
  return document.getElementById(id)
}

function loadImage( src ){
    return new Promise((res,rej)=>{
        let img = new Image();
        img.src = src;
        img.onload = () =>{
            res(img)
        }
        img.onerror= (e) =>{
            rej(e)
        }
    })
}

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

function getXY ( ele ) {
  const x = ele.getBoundingClientRect().left;
  const y = ele.getBoundingClientRect().top
  return {
    x,
    y
  }
}

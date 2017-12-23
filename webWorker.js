let i = 0
function say(){
    ++i
    //由于是独立与 当前 进程 的一个服务 所以 需要 使用 postMessage 跨域传递消息过去
    postMessage(i)
    setTimeout(()=>{
        say()
    },1000)
}
say()
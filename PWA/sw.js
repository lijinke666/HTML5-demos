//通过 serviceWorker.register 注册了这个js
/**
 * 全局变量
 * self: 表示 Service Worker 作用域, 也是全局变量
    caches: 表示缓存
    skipWaiting: 表示强制当前处在 waiting 状态的脚本进入 activate 状态
    clients: 表示 Service Worker 接管的页面
 */

 //缓存的key
 const cacheKey = "testKey"

 //需要缓存的列表
 const cacheList = [
     "/",
     "index.html",
     "index.css",
     "fetch.json",
     "demo.jpg"
 ]

 //注册 安装 service worker 时  抓取资源 写入缓存
 self.addEventListener('install',(e)=>{
     e.waitUntil(
         caches.open(cacheKey)                                  //将缓存写入在这个key中
         .then( (cache)=> cache.addAll(cacheList))
         .then(()=> self.skipWaiting())              //停止等待 页面更新时  立即激活生效 service worker 脚本
     )
 })

 //网页赚取资源 service worker 可以捕获到 fetch 事件
 self.addEventListener('fetch',(e)=>{
     console.log(e);
     e.respondWith(
         caches.match(e.request).then((res)=>{
             console.log(res);
             if(res != null) return res
             return fetch(e.request.url)
         })
     )
 })


 //更新静态资源
 self.addEventListener('activate', function(e) {
    e.waitUntil(
      Promise.all(
        caches.keys().then(cacheNames => {
            console.log(cacheNames);
          return cacheNames.map(name => {
            if (name !== cacheStorageKey) {
              return caches.delete(name)
            }
          })
        })
      ).then(() => {
        return self.clients.claim()             //取得 页面控制权 页面会使用新更新的缓存
      })
    )
  })
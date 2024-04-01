import { Application } from '@splinetool/runtime';
self.onmessage = (e) => {
    const { data } = e
    console.log('data', JSON.parse(data));

    // 2. 使用对象load方法去拉取3大模型资源
    // spline.load(`${publisPath}/scene.splinecode`).then(() => {
    //     // 模型渲染完毕之后后续的逻辑操作
    //     // 3. 拉取资源之后.then方法中可以做后续的逻辑操作
    //     self.postMessage({
    //         type: 'load-success',
    //         data: {
    //             name: 'wq',
    //             showLoading: false
    //         }
    //     })
    // })
    // setTimeout(() => {
    //     self.postMessage({
    //         type: 'load-success',
    //         data: {
    //             name: 'wq',
    //             showLoading: false
    //         }
    //     })
    // }, 5000);
}

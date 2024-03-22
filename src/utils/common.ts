//给数组添加index 的方法
export const addIndex = (arr: any[]) => {
    return arr.map((item, index) => {
        return {
            ...item,
            index: index + 1,
        };
    });
};

const GLOBAL = global || window;
GLOBAL.ThisMock = {};

/**
 * 将 mock 数据作为全局数据共享
 *
 * 在每个组件里可以通过该方法获取独立的变量空间
 * */
export function useMock(space: string) {
  if (GLOBAL.ThisMock[space]) {
    throw `space重复: ${space}`;
    return;
  }
  GLOBAL.ThisMock[space] = {};

  // 获取变量对象，类似 localstorage.get
  const get = function (name: string) {
    return GLOBAL.ThisMock[space][name];
  };

  // 在变量空间中设置变量，类似 类似 localstorage.set
  const set = function (name: string, value: any) {
    GLOBAL.ThisMock[space][name] = value;
  };
  return { get, set };
}

const GLOBAL = global || window;
GLOBAL.ThisMock = {};
interface IKVItem {
  key: string;
  value: any;
}

interface IMockTableInstance {
  // 获取某一项
  findOne: (key: string, value: any) => any;
  // 获取指定列表，key为过滤项的变量名，value为对应变量名位置的值
  findList: (filter?: Array<IKVItem> | any) => Array<any> | null;
  // 新增一项
  add: (item: any) => boolean;
  // 删除某一项
  remove: (key: string, value: any) => boolean;
  // 更新某一项
  update: (key: string, value: any, item: any) => boolean;
  /**
   * 获取一个不重复的自增ID，idKey为自增id对应的变量名
   */
  getNewId: (idKey: string) => number;
}

/**
 * 将 mock 数据作为全局数据共享
 *
 * 在每个组件里可以通过该方法获取独立的变量空间
 *
 * 注意：全局共享的数据没有持久化，每次热更新数据都会被初始化
 * */
export function useMock(space: string) {
  if (!GLOBAL.ThisMock[space]) {
    GLOBAL.ThisMock[space] = {};
  }

  /**
   * 针对结构化列表数据
   * @param keyName 需要填入的
   * @param keyList 需要初始化填入的数据
   */
  const getTableInstance = function (
    keyName: string,
    keyList: Array<any> | null | undefined,
  ) {
    const obj = {} as IMockTableInstance;
    if (keyList) {
      GLOBAL.ThisMock[space][keyName] = keyList;
    }

    let thisList: Array<any> = GLOBAL.ThisMock[space][keyName];
    if (!thisList) {
      thisList = [];
      GLOBAL.ThisMock[space][keyName] = thisList;
    }

    // 在变量空间中设置变量，类似 localstorage.set
    const setNewList = function (data: any = null) {
      GLOBAL.ThisMock[space][keyName] = data;
      thisList = data;
    };

    // findOne
    obj.findOne = function (key: string, value: any) {
      const item =
        thisList.find((item) => {
          if (item[key] === value) return item;
        }) || null;

      return item;
    };

    // findList
    obj.findList = function (filter?: Array<IKVItem> | any) {
      if (!filter) return thisList;
      const itemList = thisList.filter((item) => {
        let flag = true;
        // 通过判断类型来过滤
        filter.forEach((f) => {
          if (typeof item[f.key] === "number") {
            if (item[f.key] != f.value) {
              flag = false;
            }
          } else if (typeof item[f.key] === "string") {
            if (item[f.key].indexOf(f.value) < 0) {
              flag = false;
            }
          } else {
            flag = false;
          }
        });
        return flag;
      });

      return itemList || null;
    };

    // create
    obj.add = function (item: any) {
      thisList.push(item);
      return true;
    };

    // 删除某一项，目前 id 只支持整数类型
    // TODO 可以考虑增加批量删除功能
    obj.remove = function (key: string, value: any) {
      const newList = thisList.filter((item) => {
        return item[key] != value;
      });
      console.log(newList);
      // 重新将的全局列表放入全局变量中
      setNewList(newList);
      return true;
    };

    // update
    obj.update = function (key: string, value: any, item: any): boolean {
      for (let i = 0; i < thisList.length; i++) {
        if (thisList[i][key] === value) {
          thisList[i] = Object.assign(thisList[i], item);
        }
      }
      return true;
    };

    // 返回自增ID
    obj.getNewId = function (idKey: string): number {
      const maxId = Math.max(...thisList.map((item) => item[idKey]));
      return maxId + 1;
    };

    return obj;
  };

  return { getTableInstance };
}

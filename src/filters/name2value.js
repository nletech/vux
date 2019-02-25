import map from 'array-map'
import find from 'array-find'

const specialMap = {
  '北京市': '110000',
  '天津市': '120000',
  '上海市': '310000',
  '重庆市': '500000'
}

export default function (name, list) {
  let rs = map(name, (one, index) => {
    let parent = ''
    if (index === 2) {
      // 可能存在区名一样的情况，比如南山区
      parent = find(list, item => {
        return item.name === name[1]
      }) || { value: '__' }

      if (specialMap[name[0]]) {
        parent = {
          value: specialMap[name[0]]
        }
      }
      return find(list, item => {
        // return item.name === one && item.parent === parent.value
        return item.name === one
      })
    } else {
      if (index === 1 && specialMap[name[0]]) {
        return {
          value: specialMap[name[0]]
        }
      }
      return find(list, item => {
        return item.name === one
      })
    }
  })

  return map(rs, one => {
    return one ? one.value : '__'
  }).join(' ')
}

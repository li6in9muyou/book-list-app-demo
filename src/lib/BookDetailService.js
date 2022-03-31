import {memoize, repeat} from 'lodash'

export const fetchBookDetail = memoize(async sub => {
    const dd = `关于这本书（id: ${sub}）的简要介绍，但是有点${repeat('长', 999)}。`
    await new Promise((resolve => setTimeout(resolve, 500)))
    return dd
})

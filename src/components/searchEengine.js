export function search(query, hay, getKey) {
    let good = true
    const ans = hay.filter(item => {
        const name = getKey(item)
        try {
            good = true
            return name.match(query) !== null
        } catch (e) {
            good = false
            return false
        }
    })
    return {
        results: ans,
        success: good
    }
}

export const takeExtension = (pp) => {
    try {
        return pp.match(/\.([0-9a-z]+)$/i)[1]
    } catch {
        return 'unknown'
    }
}

export const fileNameWithoutExtension = (pp) => {
    const fileName = pp.split('\\').pop().split('/').pop()
    const parts = fileName.match(/(.*)\.([0-9a-z]+)$/i)
    if (null === parts) {
        return fileName
    } else {
        return parts[1]
    }
}

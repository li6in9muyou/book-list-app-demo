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

export async function sleep(duration) {
    await new Promise((resolve => setTimeout(resolve, duration)))
}

export function getNotify(addNotification) {
    return {
        notify: (msg) => {
            addNotification({text: msg, removeAfter: 5000, position: 'bottom-right', color: ''})
        },
        info: (msg) => {
            addNotification({text: msg, removeAfter: 5000, position: 'bottom-right', color: 'info'})
        },
        success: (msg) => {
            addNotification({text: msg, removeAfter: 5000, position: 'bottom-right', color: 'success'})
        },
        warning: (msg) => {
            addNotification({text: msg, removeAfter: 5000, position: 'bottom-right', color: 'warning'})
        },
        error: (msg) => {
            addNotification({text: msg, removeAfter: 5000, position: 'bottom-right', color: 'error'})
        }
    }
}

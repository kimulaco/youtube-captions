let copyField: HTMLPreElement | null = null

export const copyToClipbord = (text: string) => {
  if (!copyField) {
    copyField = document.createElement('pre')
    copyField.setAttribute('id', 'copy-to-clipbord')
    copyField.style.webkitUserSelect = 'auto'
    copyField.style.userSelect = 'auto'
    copyField.style.position = 'fixed'
    copyField.style.right = '100vw'
  }

  copyField.textContent = text

  document.body.appendChild(copyField)
  document.getSelection()!.selectAllChildren(copyField)

  const result = document.execCommand('copy')

  copyField.textContent = ''

  return result
}

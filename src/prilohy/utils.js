export function loadAsBase64(theFile) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()

    reader.onload = function(loadedEvent) {
      var arrayBuffer =  new Uint8Array(loadedEvent.target.result)
      const r = arrayBuffer.reduce((data, byte) => data + String.fromCharCode(byte), '') 
      resolve(btoa(r))
    }

    reader.readAsArrayBuffer(theFile)
  })
}

async function prepareData (item) {
  if (!item.f) return item
  const content = await loadAsBase64(item.f)
  return Object.assign(_.pick(item.f, 'type', 'size', 'name'), { content })
}

export async function saveAttachment (self, item) {
  // TODO: udelat edit pomoci PUT
  const api = self.$props.cfg.api
  const id = self.$props.query._detail
  const data = await prepareData(item)
  return self.$store.dispatch('send', {
    method: 'post',
    url: `${api}/prilohy/${id}`,
    data
  })
}
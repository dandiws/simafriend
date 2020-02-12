export default () => ({
  setMataKuliah(mataKuliah) {
    localStorage.setItem('simaMataKuliah', JSON.stringify(mataKuliah))
  },
  getMataKuliah() {
    return JSON.parse(localStorage.getItem('simaMataKuliah'))
  },
  clearMataKuliah() {
    localStorage.removeItem('simaMataKuliah')
  }
})

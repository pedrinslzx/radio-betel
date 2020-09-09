const askButton = document.querySelector('.ask-button')
export const pedirMusica = () => {
  const form = window
    .open(`/form.html`, 'Pedir Música - Rádio Betel FM', `
      width=500,
      height=700, 
      top=100,
      left=110,
      scrollbars=no
    `)
}
export default () => window.addEventListener('load', () => {
  askButton.addEventListener('click', () => pedirMusica())
})

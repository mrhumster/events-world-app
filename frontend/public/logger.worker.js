self.addEventListener('message', (event) => {
  const { type, message } = event.data;
  switch (type) {
      case 'log':
          console.log(message)
          const body = {desc: message}

          fetch('api/log/', {
              method: 'POST',
              body: JSON.stringify(body)
          })

              .then((response) => console.log(response.body))
              .catch((error) => console.log(error))

          break;
      case 'clear':
          fetch('api/log/', {
              method: 'DELETE'
          })
              .then((response) => console.log('Лог очищен'))
          break;
      default:
          break;
  }
});
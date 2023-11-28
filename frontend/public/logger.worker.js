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
          // TODO: Очистка файла логов
          break;
      default:
          break;
  }
});
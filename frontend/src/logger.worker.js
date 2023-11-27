self.addEventListener('message', (event) => {
  const { type, message } = event.data;
  switch (type) {
    case 'log':
      // Запись лога в файл
        console.log('Запись')
      break;
    case 'clear':
      // Очистка файла логов
      break;
    default:
      break;
  }
});
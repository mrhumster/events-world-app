class Logger {
  constructor(worker) {
    this.worker = worker;
  }

  log(message) {
    this.worker.postMessage({ type: 'log', message });
  }

  clear() {
    this.worker.postMessage({ type: 'clear' });
  }
}

const loggerWorker = new Worker('/logger.worker.js');
const logger = new Logger(loggerWorker);

export default logger;
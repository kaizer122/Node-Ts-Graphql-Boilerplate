export default class Exception {
  message: string;
  success: boolean;
  code: number;
  constructor(message = "", code = 403, success = false) {
    this.message = message;
    this.success = success;
    this.code = code;
  }
}

import HttpException from './HttpException'

class EntityNotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message)
  }
}

export default EntityNotFoundException
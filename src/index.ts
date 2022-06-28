import { createHmac } from 'crypto'
import got from 'got'

export interface GeeTestOptions {
  captchaId: string
  captchaKey: string
  apiServer?: string
}

export interface GeeTestValidateOptions {
  lotNumber: string
  captchaOutput: string
  passToken: string
  genTime: string | number
}

export interface GeeTestValidateResponse {
  result: 'success' | 'fail'
  reason: string
  captcha_args: {
    used_type: string
    user_ip: string
    lot_number: string
    scene: string
    referer: string
  }
}

export class GeeTest {
  private readonly options!: GeeTestOptions
  private readonly apiServer!: string

  constructor(options: GeeTestOptions) {
    this.options = options
    this.apiServer = `${
      options.apiServer || 'http://gcaptcha4.geetest.com'
    }/validate?captcha_id=${options.captchaId}`
  }

  async validate(
    options: GeeTestValidateOptions
  ): Promise<GeeTestValidateResponse> {
    const signToken = this.hmacSha256Encode(
      options.lotNumber,
      this.options.captchaKey
    )

    return got
      .post(this.apiServer, {
        form: {
          lot_number: options.lotNumber,
          captcha_output: options.captchaOutput,
          pass_token: options.passToken,
          gen_time: options.genTime,
          sign_token: signToken
        }
      })
      .json()
  }

  private hmacSha256Encode(str: string, key: string) {
    return createHmac('sha256', key).update(str).digest('hex')
  }
}

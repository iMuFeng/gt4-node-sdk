# gt4 node sdk

[![Build Status](https://github.com/iMuFeng/gt4-node-sdk/workflows/CI/badge.svg)](https://github.com/iMuFeng/gt4-node-sdk/actions)
[![Coverage](https://img.shields.io/codecov/c/github/iMuFeng/gt4-node-sdk/master.svg?sanitize=true)](https://codecov.io/github/iMuFeng/gt4-node-sdk)
[![NPM Version](https://img.shields.io/npm/v/gt4-node-sdk.svg?sanitize=true)](https://www.npmjs.com/package/gt4-node-sdk)

GeeTest4 Node.js SDK

## Installation

Install the library with `npm install gt4-node-sdk` or `yarn add gt4-node-sdk`

## Usage

```js
import { GeeTest } from 'gt4-node-sdk'

const gt = new GeeTest({
  captchaId: 'your_id',
  captchaKey: 'your_key'
})

const { result, reason } = await gt.validate({
  lotNumber: 'your_lot_number',
  captchaOutput: 'your_captcha_output',
  passToken: 'your_pass_token',
  genTime: 'your_gen_time'
})

if (result === 'success') {
  console.log('success')
} else {
	console.log('fail: %s', reason)
}
```

## Tests

Tests are using jest, to run the tests use:

```bash
$ npm run test
```

## MIT license

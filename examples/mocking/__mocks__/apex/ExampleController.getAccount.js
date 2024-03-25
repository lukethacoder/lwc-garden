/**
 * https://lwc.dev/guide/wire_adapter#wire-adapters
 */
export default class getAccount {
  connected = false

  accountId

  constructor(dataCallback) {
    this.dataCallback = dataCallback
  }

  connect() {
    this.connected = true
    this.runMethod()
  }

  disconnect() {
    this.connected = false
  }

  update(config) {
    // if any of the wire values have changed
    if (
      this.isDiff(config, 'accountId') ||
      this.isDiff(config, 'publishStatus')
    ) {
      this.accountId = config.accountId

      this.runMethod()
    }
  }

  isDiff = (config, key) => this[key] !== config[key]

  runMethod() {
    const { connected, accountId } = this

    if (connected && !!accountId) {
      // '001' is how all accountIds start - using for testing here
      if (accountId.startsWith('001')) {
        this.dataCallback({
          data: {
            Id: fillStart(
              accountId,
              `001${generateNumberString()}${generateAlphabeticString()}`
            ),
            Name: 'LWC Garden Account',
          },
          error: undefined,
        })
      } else {
        this.dataCallback({
          data: undefined,
          error: {
            message: 'Invalid accountId. AccountIds start with "001"',
          },
        })
      }
    }
  }
}

function fillStart(str, presetString) {
  const maxLength = 16

  // Slice the input string to the desired length (or full length if less than 16)
  const inputString = str.slice(0, Math.min(str.length, maxLength))

  // This ensures the preset string is sliced from the END to fill remaining space
  const paddedPreset = presetString.slice(-(maxLength - inputString.length))

  // Combine the input string and the padded preset string
  const result = inputString + paddedPreset

  return result
}

function generateNumberString(length = 8) {
  // Create a string of digits (0-9)
  const digits = '0123456789'

  // Use a loop to generate a random string of 11 characters
  let numberString = ''
  for (let i = 0; i < length; i++) {
    numberString += digits[Math.floor(Math.random() * digits.length)]
  }

  return numberString
}

function generateAlphabeticString(length = 3) {
  // Create a string of uppercase and lowercase letters
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  // Similar loop-based approach to generate random characters
  let alphaString = ''
  for (let i = 0; i < length; i++) {
    alphaString += letters[Math.floor(Math.random() * letters.length)]
  }

  return alphaString
}

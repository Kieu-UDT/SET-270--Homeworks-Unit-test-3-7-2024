function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value)
}

function convertNumberToHexadecimal(number) {
    const hexaDecimalDigits = '0123456789ABCDEF'
    let isNegative = number < 0
    number = Math.abs(number)

    let hexaDecimal = ''
    do {
        hexaDecimal = hexaDecimalDigits[number % 16] + hexaDecimal
        number = Math.floor(number / 16)
    } while (number > 0)

    return isNegative ? '-' + hexaDecimal : hexaDecimal
}

function convertDecimalToHexaDecimal(input) {
    if (Array.isArray(input)) {
        if (!input.every(isValidNumber)) {
            return 'Invalid number array'
        }
        return input.map(convertNumberToHexadecimal)
    }

    if (!isValidNumber(input)) {
        return 'Invalid input'
    }

    return convertNumberToHexadecimal(input)
}

function runUnitTests() {
    const testCases = [
        { input: 10, expectedOutput: 'A' },
        { input: 255, expectedOutput: 'FF' },
        { input: 0, expectedOutput: '0' },
        { input: -15, expectedOutput: '-F' },

        { input: [10, 255, 0, -15], expectedOutput: ['A', 'FF', '0', '-F'] },
        { input: [16, 32, 48], expectedOutput: ['10', '20', '30'] },

        { input: [1, 'a', {}], expectedOutput: 'Invalid number array' },
        { input: [1, 3, undefined], expectedOutput: 'Invalid number array' },
        { input: [null, 3, 54], expectedOutput: 'Invalid number array' },
        { input: [346, NaN, 54], expectedOutput: 'Invalid number array' },

        { input: undefined, expectedOutput: 'Invalid input' },
        { input: null, expectedOutput: 'Invalid input' },
        { input: NaN, expectedOutput: 'Invalid input' },
        { input: {}, expectedOutput: 'Invalid input' }
    ]

    testCases.forEach(({ input, expectedOutput }, index) => {
        const result = convertDecimalToHexaDecimal(input)
        const passed = JSON.stringify(result) === JSON.stringify(expectedOutput)
        console.log(`Test case ${index + 1}: ${passed ? 'Pass' : 'Fail'}`)
    })
}

runUnitTests()
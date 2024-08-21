import { expect, test } from 'vitest'

import { deserializeAccessList } from './deserializeAccessList.js'

test('deserializeAccessList', () => {
  expect(
    deserializeAccessList([
      [
        '0x1234512345123451234512345123451234512345',
        [
          '0x1234512345123451234512345123451234512345',
          '0x0000512345123451234512345123451234512345',
          '0x1234512345123451234512345123451234512345123451234512345123423232',
        ],
      ],
    ]),
  ).toMatchInlineSnapshot(`
    [
      {
        "address": "0x1234512345123451234512345123451234512345",
        "storageKeys": [
          "0x1234512345123451234512345123451234512345",
          "0x512345123451234512345123451234512345",
          "0x1234512345123451234512345123451234512345123451234512345123423232",
        ],
      },
    ]
  `)
})

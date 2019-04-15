import { addDigitsUntil } from './KeysController.js';

describe('KeysController', () => {

  describe('addDigitsUntil', () => {

    test.each([
      [ 20190412, 18, 10 ],
      [ 20190413, 18, 2 ],
      [ 20190414, 18, 3 ],
      [ 20190415, 18, 4 ],
      [ 20190416, 18, 5 ],
      [ 20190417, 18, 6 ],
      [ 20190418, 18, 7 ],
      [ 20190419, 18, 8 ],
      [ 20190420, 18, 18 ],
      [ 20190421, 18, 10 ],
      [ 20190422, 18, 2 ],
      [ 20190423, 18, 3 ],
      [ 20190424, 18, 4 ],
    ])("addDigitsUntil(%d, %d) => %d", ( number, max, expected ) => {
      expect(addDigitsUntil(number, max)).toBe(expected);
    });

  });

});

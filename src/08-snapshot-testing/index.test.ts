// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const inputArray = [1, 2, 3, 4, 5];
    const expectedStructure = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };
    const resultingList = generateLinkedList(inputArray);
    expect(resultingList).toStrictEqual(expectedStructure);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const inputSequence = [1, 2, 3, 4, 5];
    const resultingList = generateLinkedList(inputSequence);
    expect(resultingList).toMatchSnapshot();
  });
});

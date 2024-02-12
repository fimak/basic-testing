// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const mock = axios as jest.Mocked<typeof axios>;
  beforeEach(() => {
    mock.create.mockClear().mockImplementation(() => mock);
    mock.get.mockClear().mockResolvedValueOnce({ data: 'expected data' });
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    const path = 'test-path';
    await throttledGetDataFromApi(path);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const path = 'test-path';
    await throttledGetDataFromApi(path);
    expect(mock.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    // Write your test here
    const path = 'test-path';
    const result = await throttledGetDataFromApi(path);
    expect(result).toEqual('expected data');
  });
});

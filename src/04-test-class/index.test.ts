// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const value = 750;
    const account = getBankAccount(value);
    expect(account.getBalance()).toBe(value);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const value = 750;
    const account = getBankAccount(value);
    expect(() => account.withdraw(value + 100)).toThrow(
      `Insufficient funds: cannot withdraw more than ${value}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const value = 750;
    const firstAccount = getBankAccount(value);
    const secondAccount = getBankAccount(1);
    expect(() => firstAccount.transfer(value * 2, secondAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${value}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const value = 750;
    const account = getBankAccount(value);
    expect(() => account.transfer(value, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    // Write your test here
    const value = 750;
    const account = getBankAccount(value);
    account.deposit(250);
    expect(account.getBalance()).toBe(value + 250);
  });

  test('should withdraw money', () => {
    // Write your test here
    const value = 750;
    const account = getBankAccount(value);
    account.withdraw(500);
    expect(account.getBalance()).toBe(value - 500);
  });

  test('should transfer money', () => {
    // Write your test here
    const value = 750;
    const firstAccount = getBankAccount(value);
    const secondAccount = getBankAccount(value / 2);
    firstAccount.transfer(250, secondAccount);
    expect(firstAccount.getBalance()).toBe(value - 250);
    expect(secondAccount.getBalance()).toBe(value / 2 + 250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const value = 750;
    const account = getBankAccount(value);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(1000);
    const balance = await account.fetchBalance();
    expect(balance).toBe(1000);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const value = 750;
    const account = getBankAccount(value);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(1000);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const value = 750;
    const account = getBankAccount(value);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});

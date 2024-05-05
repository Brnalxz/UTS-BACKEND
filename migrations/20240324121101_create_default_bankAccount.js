const logger = require('../src/core/logger')('api');
const { bankUser } = require('../src/models');
const { hashPassword } = require('../src/utils/password');

const ownerName = 'Administrator';
const accountNumber = '123456789';
const bank = "ABC"
const balance = "50000";
const password = '123456';

logger.info('Creating default users');

(async () => {
  try {
    const bankAccount = await bankUser.countDocuments({
      ownerName,
      bank,
      accountNumber,
      balance,
    });

    if (bankAccount > 0) {
      throw new Error(`Bank account number: ${accountNumber} already exists`);
    }

    const hashedPassword = await hashPassword(password);
    await bankUser.create({
      ownerName,
      bank,
      accountNumber,
      balance,
      password: hashedPassword,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
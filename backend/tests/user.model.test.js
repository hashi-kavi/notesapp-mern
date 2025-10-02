const User = require('../models/User');

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user with valid data', async () => {
    const userData = {
      username: 'testuser' + Date.now(),
      password: 'testPassword1'
    };
    
    const user = new User(userData);
    const savedUser = await user.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
  });

  it('should fail to create user with duplicate username', async () => {
    const userData1 = {
      username: 'testuser',
      password: 'testPassword1'
    };
    const userData2 = {
      username: 'testuser', // Same username
      password: 'testPassword2'
    };
    
    const user1 = new User(userData1);
    await user1.save();
    
    const user2 = new User(userData2);
    await expect(user2.save()).rejects.toThrow();
  });
});

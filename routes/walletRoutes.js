// POST /api/wallet/update
router.post('/wallet/update', async (req, res) => {
  const { userId, amount, type } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.wallet = type === 'credit'
    ? user.wallet + amount
    : Math.max(0, user.wallet - amount);

  await user.save();
  res.json({ message: 'Wallet updated', wallet: user.wallet });
});

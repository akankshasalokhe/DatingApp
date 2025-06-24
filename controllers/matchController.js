const Match = require('../models/matchModel');
const Conversation = require('../models/conversationModel');

const likeUserController = async (req, res) => {
  try {
    const { likerId, likedId } = req.body;

    // Check if liked user already liked this user before (mutual)
    const existingMatch = await Match.findOne({ liker: likedId, liked: likerId });

    if (existingMatch) {
      // Mutual like — update both
      existingMatch.matched = true;
      await existingMatch.save();

      // Also create new match from current liker
      await Match.create({ liker: likerId, liked: likedId, matched: true });

      // Check if conversation exists
      const convoExists = await Conversation.findOne({
        members: { $all: [likerId, likedId] }
      });

      if (!convoExists) {
        await Conversation.create({ members: [likerId, likedId] });
      }

      return res.status(200).json({ message: 'Matched! Conversation created.' });
    }

    // Not mutual yet — just store like
    await Match.create({ liker: likerId, liked: likedId, matched: false });
    res.status(200).json({ message: 'Liked successfully, waiting for match.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process like.' });
  }
};

module.exports = { likeUserController }


/* 
  MDB Schema Placeholder 
  In a real environment, use: import mongoose from 'mongoose';
*/

export const UserSchema = {
  username: String,
  email: { type: String, unique: true },
  passwordHash: String,
  tier: { type: String, enum: ['free', 'pro'], default: 'free' },
  stripeCustomerId: String,
  dailyUsageCount: Number,
  lastUsedAt: Date,
  createdAt: { type: Date, default: Date.now }
};

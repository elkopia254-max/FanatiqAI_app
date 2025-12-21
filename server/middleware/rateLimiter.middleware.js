
export const rateLimiter = (req, res, next) => {
  const { tier, dailyUsage } = req.user;
  
  const LIMITS = {
    free: 3,
    pro: Infinity
  };

  if (dailyUsage >= LIMITS[tier]) {
    return res.status(429).json({
      error: "Daily resonance limit reached.",
      code: "LIMIT_EXCEEDED",
      upgradeLink: "/pricing"
    });
  }

  next();
};

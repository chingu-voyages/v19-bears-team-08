const router = require("express").Router();

router.get("/:name", showEmailTemplates);
router.get("/verify", renderEmail);

async function showEmailTemplates(req, res, next) {
  try {
    res.render(`templates/${req.params.name}`, req.query);
  } catch (err) {
    next(err);
  }
}

async function renderEmail(req, res, next) {
  try {
    const err = await sendMail({
      to: process.env.MAILER_EMAIL,
      subject: "Confirm your email - Chingu",
      template: "verifyEmail",
      ctx: {
        name: "Tester1",
        token: "1234567890",
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = router;

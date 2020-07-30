const router = require("express").Router();
const { checkDev } = require("../middleware");
const sendMail = require("../utils/sendMail");

router.get("/view/:file", checkDev, showEmailTemplates);
router.get("/test/:file", checkDev, sendEmailTemplates);

async function showEmailTemplates(req, res, next) {
  try {
    res.status(200).render(`templates/${req.params.file}`, req.query);
  } catch (err) {
    next(err);
  }
}

async function sendEmailTemplates(req, res, next) {
  try {
    const { to, subject, name, token } = req.query;

    const err = await sendMail({
      template: `templates/${req.params.file}`,
      to,
      subject,
      ctx: {
        name,
        token,
      },
    });

    console.log(err);
    res.status(200).json({ message: "Email sent. Check your inbox." });
  } catch (err) {
    next(err);
  }
}

module.exports = router;

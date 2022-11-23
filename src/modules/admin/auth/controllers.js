const { Administrator } = require('../../../models');
const smtpTransport = require('../../../services/nodemailer');
const { genCryptoToken, emailTemplates } = require('../../../helpers');

module.exports = {
  loginPage: (req, res) => {
    res.render('admin/body/auth/login');
  },
  onLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const administrator = await Administrator.findOne({ email });

      if (administrator && administrator.isBlocked) {
        req.flash('danger', 'Account is blocked!');

        return res.status(401).redirect('/admin/auth/login');
      }

      if (!administrator || !administrator.comparePassword(password)) {
        req.flash('danger', 'Username or password is incorrect!');

        return res.status(401).redirect('/admin/auth/login');
      }

      req.session.admin = { id: administrator._id };

      res.redirect('/admin');
    } catch (error) {
      next(error);
    }
  },

  forgotPasswordPage: (req, res) => {
    res.render('admin/body/auth/forgot_password');
  },
  onSendPasswordReset: async (req, res, next) => {
    try {
      const { email } = req.body;
      const resetPasswordToken = await genCryptoToken();

      const administrator = await Administrator.findOne({ email });

      if (!administrator) {
        req.flash('warning', 'Can\'t find that email, sorry');
        res.redirect('back');
        return;
      }

      administrator.resetPasswordToken = resetPasswordToken;
      administrator.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await administrator.save();

      const mailOptions = {
        to: administrator.email,
        from: 'VestCalendar service <vestcalendar@gmail.com>',
        subject: 'Password Reset',
        html: emailTemplates.resetPassword({
          name: 'VestCalendar',
          logo: 'https://vestcalendar.com/wp-content/uploads/2019/06/Copie-de-Copie-de-Zone-1-1.png',
          linkResetPass: `${req.protocol}://${req.headers.host}/admin/auth/password-reset/${administrator.resetPasswordToken}`,
          linkForgotPass: `${req.protocol}://${req.headers.host}/admin/auth/password-reset`,
          address: '',
        }),
      };

      await smtpTransport.sendMail(mailOptions);

      req.flash('success', `An e-mail has been sent to ${administrator.email} with further instructions.`);

      return res.redirect('/admin/auth/login');
    } catch (error) {
      next(error);
    }
  },

  passwordResetPage: async (req, res, next) => {
    try {
      const { token } = req.params;

      const administrator = await Administrator.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!administrator) {
        req.flash('danger', 'Password reset token is invalid or expired');
        return res.redirect('/admin/auth/password-reset');
      }

      res.render('admin/body/auth/password_reset');
    } catch (error) {
      next(error);
    }
  },
  onChangePassword: async (req, res, next) => {
    try {
      const administrator = await Administrator.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!administrator) {
        req.flash('danger', 'Password reset token is invalid or expired');
        return res.redirect('/admin/auth/password-reset');
      }

      administrator.password = req.body.newPassword;
      administrator.resetPasswordToken = undefined;
      administrator.resetPasswordExpires = undefined;

      await administrator.save();

      req.flash('success', 'Your password has been changed');
      res.redirect('/admin/auth/login');
    } catch (error) {
      next(error);
    }
  },
};

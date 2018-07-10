import passport from 'passport'
import jwt from 'jsonwebtoken'

/**
 * Passport's authenticate options:
 *
 *  failureFlash      : string | boolean;
 *  failureMessage    : boolean | string;
 *  failureRedirect   : string;
 *  session           : boolean;
 *  successFlash      : string | boolean;
 *  successMessage    : boolean | string;
 *  successRedirect   : string;

 *
 * successRedirect - path to redirect to on a success.
 * failureRedirect - path to redirect to on a failure (instead of 401).
 * failureFlash    - True to flash failure messages or a string to use as a
 *                    flash message for failures (overrides any from the
 *                    strategy itself).
 * successFlash    - True to flash success messages or a string to use as a
 *                    flash message for success (overrides any from the strategy
 *                    itself).
 * successMessage  - True to store success message in req.session.messages, or
 *                    a string to use as override message for success.
 * failureMessage  - True to store failure message in req.session.messages, or
 *                    a string to use as override message for failure.
 * session         - boolean, enables session support (default true)
 * failWithError   - On failure, call next() with an AuthenticationError
 *                    instead of just writing a 401.
 */

export const localLoginMiddleware = passport.authenticate('local-login', {
  // login form authentication with passport
  successRedirect: '/profile',
  failureRedirect: '/local/login',
  // failureFlash: true,
})

export const localSignupMiddleware = passport.authenticate('local-signup', {
  // signup form authentication with passport
  successRedirect: '/profile',
  failureRedirect: '/local/signup',
  // failureFlash: true,
})

export const jwtLoginMiddleware = passport.authenticate('jwt-login', {
  successRedirect: '/profile',
  failureRedirect: '/jwt/login',
  session: false,
  // failureFlash: true
})

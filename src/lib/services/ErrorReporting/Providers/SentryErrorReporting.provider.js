import * as Sentry from '@sentry/browser';
import BaseErrorReportingProvider from './BaseErrorReporting.provider';

class SentryErrorReporting extends BaseErrorReportingProvider {
  constructor(dsn) {
    super();
    const isRelease = process.env.NODE_ENV === 'production';
    if (dsn === undefined) {
      console.warn(
        'Missing FE DSN for Sentry. Set the SENTRY_FE_DSN env var correctly to configure error reporting'
      );
      return;
    }
    console.info('Sentry Error Reporting has been initialized');
    Sentry.init({ dsn, debug: !isRelease });
  }

  configureContext(userId, emailAddress) {
    Sentry.configureScope(scope => {
      scope.setUser({ id: userId, email: emailAddress });
    });
  }

  captureError(error) {
    Sentry.captureException(error);
  }

  addBreadcrumb(category, message) {
    Sentry.addBreadcrumb({
      category,
      message,
      level: Sentry.Severity.Error,
    });
  }
}

export default SentryErrorReporting;

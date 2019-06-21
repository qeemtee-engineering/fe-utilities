import BaseErrorReportingProvider from "./BaseErrorReporting.provider"

const Sentry = require('@sentry/browser');

class SentryErrorReporting extends BaseErrorReportingProvider {

    constructor(dsn) {
        super()
        const isRelease = process.env.NODE_ENV === 'production'
        if (dsn == undefined) {
            console.warn('Missing FE DSN for Sentry. Set the SENTRY_FE_DSN env var correctly to configure error reporting');
            return;
        } else {
            console.info("Sentry Error Reporting has been initialized");
            Sentry.init({dsn: dsn, debug: !isRelease});
        }
    }

    configureContext(userId, emailAddress) {
        Sentry.configureScope((scope) => {
            scope.setUser({"id": userId, "email": emailAddress});
          });
    }

    captureError(error) {
        Sentry.captureException(error)
    }

    addBreadcrumb(category, message) {
        Sentry.addBreadcrumb({
            category: category,
            message: message,
            level: Sentry.Severity.Error
          });
    }
}

export default SentryErrorReporting;
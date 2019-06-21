import { SentryErrorReporting } from './ErrorReporting'

class ErrorReportingService {

    constructor(sentryKey) {
        this.providers = [new SentryErrorReporting(sentryKey)];
    }

    configureContext(userId, emailAddress) {
        this.providers.forEach(function(provider) {
            provider.configureContext(userId, emailAddress);
        });
    }

    captureError(error) {
        this.providers.forEach(function(provider) {
            provider.captureError(error);
        });
    }

    addBreadcrumb(category, message) {
        this.providers.forEach(function(provider) {
            provider.addBreadcrumb(category, message);
        });
    }
}   

export default ErrorReportingService;
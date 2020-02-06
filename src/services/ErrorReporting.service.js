import { SentryErrorReporting } from './ErrorReporting';

class ErrorReportingService {
  constructor(sentryKey) {
    this.providers = [new SentryErrorReporting(sentryKey)];
  }

  configureContext(userId, emailAddress) {
    this.providers.forEach((provider) => {
      provider.configureContext(userId, emailAddress);
    });
  }

  captureError(error) {
    this.providers.forEach((provider) => {
      provider.captureError(error);
    });
  }

  addBreadcrumb(category, message) {
    this.providers.forEach((provider) => {
      provider.addBreadcrumb(category, message);
    });
  }
}

export default ErrorReportingService;

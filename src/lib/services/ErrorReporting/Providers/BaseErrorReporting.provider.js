class BaseErrorReportingProvider {
    constructor() {}

    configureContext(userId, emailAddress) {
        // SUBCLASSES AND FILL OUT
        throw Error('Subclass should fill configureContext');
    }

    captureError(error) {
        // SUBCLASSES AND FILL OUT
        throw Error('Subclass should fill captureErrror');
    }

    addBreadcrumb(category, message) {
        // SUBCLASSES AND FILL OUT
        throw Error('Subclass should fill addBreadcrumb');
    }

}

export default BaseErrorReportingProvider;
import * as mixpanel from 'mixpanel-browser';

export default class MixPanelAnalytics {
  constructor(token, userDetails) {
    const isRelease = process.env.NODE_ENV === 'production';
    if (!isRelase && token === undefined) {
      console.warn(
        'Missing token for Mix Panel. Set the MIXPANEL_TOKEN env var correctly to configure analyitcs'
      );
      return;
    }
    mixpanel.init(token);
    if (userDetails) {
      mixpanel.register(userDetails);
    }
    console.info('Mix Panel has been initialized');
  }

  /**
   *
   * @param {String} userId
   * @param {any} properties
   * @param {any} [options] The option params is optional
   */
  setUser(userId, properties) {
    mixpanel.identify(userId);
    mixpanel.people.set(properties);
  }

  /**
   *
   * @param {String} eventName
   * @param {Object} [properties]
   */
  trackEvent(eventName, properties) {
    mixpanel.track(eventName, properties);
  }

  /**
   *
   * @param {String} pageName
   */
  trackPage(pageName, properties) {
    mixpanel.track(pageName, properties);
  }
}

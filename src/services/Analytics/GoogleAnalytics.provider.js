import ua from "universal-analytics";

export default class GoogleAnalytics {
  constructor(token) {
    const isRelease = process.env.NODE_ENV === "production";
    if (!isRelease || !token) {
      console.warn(
        "Missing token for GA. Set the GA_TOKEN env var correctly to configure analyitcs"
      );
      return;
    }
    this.token = token;
    this.visitor = ua(token);
    console.info("Google Analytics has been initialized");
  }

  trackPage(pageName) {
    if (this.visitor) {
      this.visitor.pageview(pageName).send();
    }
  }

  trackEvent(category, action) {
    if (this.visitor) {
      this.visitor.event(category, action).send();
    }
  }

  register(userDetails) {
    if (this.visitor) {
      if (userDetails.id) {
        this.visitor = ua(this.token, userDetails.id, {
          strictCidFormat: false,
          http: true,
        });
        delete userDetails.id;
      }
      Object.keys(userDetails).forEach((key) => {
        this.visitor.set(key, userDetails[key]);
      });
    }
  }
}

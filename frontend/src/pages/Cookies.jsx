import { Cookie } from "lucide-react";

function Cookies() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 md:p-10">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Cookie className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900">
              Cookies Policy
            </h1>
            <p className="text-sm text-zinc-500">
              Last updated: July 2026
            </p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-7 text-zinc-700">

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help websites remember your preferences, improve
              performance, and provide a better browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              2. How We Use Cookies
            </h2>
            <p>
              We use cookies to maintain user sessions, remember login status,
              improve website functionality, analyze traffic, and enhance your
              overall shopping experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              3. Types of Cookies We Use
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly.
              </li>

              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                visitors interact with our website.
              </li>

              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                such as language or saved settings.
              </li>

              <li>
                <strong>Security Cookies:</strong> Help protect your account and
                detect unauthorized access.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              4. Managing Cookies
            </h2>
            <p>
              Most web browsers allow you to control or disable cookies through
              browser settings. Please note that disabling certain cookies may
              affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              5. Third-Party Cookies
            </h2>
            <p>
              Some third-party services, such as payment gateways and analytics
              providers, may place cookies on your device to enable their
              services or improve performance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              6. Updates to This Policy
            </h2>
            <p>
              We may update this Cookies Policy from time to time. Any changes
              will be posted on this page with the revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have any questions regarding our use of cookies, please
              contact our support team through the contact information provided
              on our website.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Cookies;
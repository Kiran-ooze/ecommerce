function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Legal
        </span>

        <h1 className="text-4xl font-extrabold text-zinc-900 mt-2">
          Privacy Policy
        </h1>

        <p className="text-sm text-zinc-500 mt-3">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <section className="space-y-8 text-zinc-700 leading-7">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Information We Collect
          </h2>

          <p>
            We collect information that you provide directly when creating an
            account, placing an order, contacting support, or interacting with
            our services. This may include your name, email address, phone
            number, shipping address, and payment-related information.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            How We Use Your Information
          </h2>

          <p>
            Your information is used to process orders, deliver products,
            improve our services, provide customer support, communicate order
            updates, and maintain the security of your account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Payment Information
          </h2>

          <p>
            Online payments are securely processed through trusted third-party
            payment providers. We do not store your complete card details on our
            servers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Data Security
          </h2>

          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Sharing Information
          </h2>

          <p>
            We do not sell your personal information. Information may be shared
            only with trusted service providers who help us operate our
            platform, process payments, or deliver products.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Contact Us
          </h2>

          <p>
            If you have any questions regarding this Privacy Policy, please
            contact our support team through the contact information provided on
            our website.
          </p>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
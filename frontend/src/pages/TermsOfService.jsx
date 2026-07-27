import { FileText } from "lucide-react";

function TermsOfService() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 md:p-10">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900">
              Terms of Service
            </h1>
            <p className="text-sm text-zinc-500">
              Last updated: July 2026
            </p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-7 text-zinc-700">

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our website, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these
              terms, you should discontinue using our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              2. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. Please notify us immediately if you suspect unauthorized
              access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              3. Orders & Payments
            </h2>
            <p>
              All orders are subject to product availability and confirmation.
              Payments made through supported payment gateways are securely
              processed. Cash on Delivery (COD) may be available for eligible
              orders.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              4. Shipping & Delivery
            </h2>
            <p>
              Delivery timelines are estimates and may vary due to unforeseen
              circumstances. We are not responsible for delays caused by
              shipping partners or force majeure events.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              5. Returns & Refunds
            </h2>
            <p>
              Eligible products may be returned within the applicable return
              period, subject to our Return Policy. Refunds will be processed
              through the original payment method whenever applicable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              6. Intellectual Property
            </h2>
            <p>
              All content, including logos, graphics, product images, and text,
              is the property of this website or its licensors and may not be
              copied or reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              We shall not be liable for indirect, incidental, or consequential
              damages arising from the use of our services or products, except
              where required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              8. Changes to These Terms
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Updated versions will be posted on this page with the revised
              effective date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-2">
              9. Contact Us
            </h2>
            <p>
              If you have any questions regarding these Terms of Service, please
              contact our support team through the contact information available
              on our website.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
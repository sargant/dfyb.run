import { Heading, Link, Paragraph } from '../components'

export const Privacy: React.FC = () => (
  <div className="container mx-auto my-8 max-w-screen-sm">
    <Heading>
      Your privacy
    </Heading>
    <Paragraph>
      As part of generating your pass, this service asks you to
      input <em>personally identifiable information</em> (PII), such as your name,
      medical conditions, and emergency contact details. Only your athlete ID is required —
      all other fields are optional (your name will show as &quot;Unknown&quot; if left blank).
    </Paragraph>
    <Paragraph>
      Your generated pass is immediately downloaded to and stored locally on your devices underline
      your control. At no point are these passes retained by the service.
    </Paragraph>
    <Paragraph>
      Your PII is passed to the pass generation API in the query string. Access to this service
      is via HTTPS only and so this data is encrypted in transit. The HTTP calls are logged
      by <Link href="https://logflare.app">logflare.app</Link> for debugging purposes, and are purged
      after 72 hours.
    </Paragraph>
    <Paragraph>
      Google Analytics is used to perform basic monitoring and analytics, but none of the PII you enter
      into the pass generator is recorded as part of this process. This service does not generate any
      of its own cookies.
    </Paragraph>
    <Paragraph>
      This service is open-source, with the code available
      at <Link href="https://github.com/sargant/dfyb.run">github</Link>, and deployed
      to <Link href="https://vercel.com">Vercel</Link>.
    </Paragraph>
    <Paragraph>
      If you have any other questions, please contact me via email
      at <Link href="mailto:hello@dfyb.run">hello@dfyb.run</Link> or on twitter
      at <Link href="https://twitter.com/dfyb_run">@dfyb_run</Link>.
    </Paragraph>
  </div>
)

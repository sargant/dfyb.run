import { Link, Heading, Paragraph } from '../components'
import BarcodeForm from './BarcodeForm'

export const Home: React.FC = () => (
  <div className="container max-w-screen-xl mx-auto my-8 grid grid-cols-1 md:(grid-cols-2 gap-x-12)">
    <div className="mx-8 mb-12 order-last md:order-first">
      <Heading>
        What is this?
      </Heading>
      <Paragraph>
        <strong>dfyb.run</strong> is a tool that lets you add your <Link href="https://parkrun.com">parkrun</Link> barcode
        to the <Link href="https://www.apple.com/wallet">Apple Wallet</Link> on your iPhone or Apple Watch.
      </Paragraph>
      <Paragraph>
        In <Link href="https://blog.parkrun.com/uk/2021/11/22/scanning-from-mobile-devices/">November 2021</Link> parkrun HQ
        announced that virtual barcodes were now acceptable at their events, and that a physical barcode was no longer mandatory.
        As iPhones and Apple Watches have the Apple Wallet feature that make ID passes and barcodes easily accessible,
        it seemed like a great fit!
      </Paragraph>
      <div className="flex flex-row justify-around my-4">
        <div className="w-64 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg text-center mr-4">
          <div className="bg-black p-2 rounded-lg">
            <img className="object-cover" src="/iphone-screenshot.png" alt="The pass on an iPhone" />
          </div>
          <p className="pt-4">
            On an iPhone 📱
          </p>
        </div>
        <div className="w-64 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg text-center ml-4">
          <div className="bg-black p-2 rounded-lg">
            <img className="object-cover" src="/watch-screenshot.png" alt="The pass on an Apple Watch" />
          </div>
          <p className="pt-4">
            On an Apple Watch ⌚
          </p>
        </div>
      </div>
      <Heading>
        Who made this?
      </Heading>
      <Paragraph>
        This tool was made by Robert Sargant (<Link href="https://www.parkrun.org.uk/parkrunner/208864">A208864</Link>) in order to scratch a personal itch.
        It&apos;s open source, and you can <Link href="https://github.com/sargant/dfyb.run">find it on Github</Link>!
      </Paragraph>
      <Paragraph>
        If you&apos;d like to give me any feedback, you can email me <Link href="mailto:hello@dfyb.run">hello@dfyb.run</Link> or find me on twitter <Link href="https://twitter.com/dfyb_run">@dfyb_run</Link>.
      </Paragraph>
      <Paragraph>
        If you&apos;d like to tip a little something to cover the costs of developing this, please go to <Link href="https://ko-fi.com/sargant">ko-fi.com/sargant</Link> 🙂
      </Paragraph>
    </div>
    <div className="mx-8 mb-12">
      <BarcodeForm />
    </div>
  </div>
)

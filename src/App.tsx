import BarcodeForm from './BarcodeForm'

interface LinkProps {
  href: string
}

const Link: React.FC<LinkProps> = ({ href, children }) => (
  <a href={href} className="underline text-primary dark:text-secondary hover:no-underline whitespace-nowrap">
    {children}
  </a>
)

const SectionHeader: React.FC = ({ children }) => (
  <h3 className="text-primary dark:text-secondary font-header font-bold text-xl mt-8 mb-2">
    {children}
  </h3>
)

const Paragraph: React.FC = ({ children }) => (
  <p className="mb-4">
    {children}
  </p>
)

const App: React.FC = () => (
  <>
    <div className="bg-primary text-white flex flex-col justify-center items-center text-center p-8">
      <img src="/logo.svg" alt="dfyb.run logo" className="w-16 md:w-24" />
      <h1 className="text-4xl md:text-6xl font-header">
        dfyb.run <span className="text-secondary">beta</span>
      </h1>
      <p className="pt-8">
        Add your barcodes for a certain 5K and 2K run 🏃💨 to your iPhone 📱 and Apple Watch ⌚
      </p>
      <p className="pt-2">
        Feedback? Comments? 📧 <a href="mailto:hello@dfyb.run" className="whitespace-nowrap underline">hello@dfyb.run</a>
      </p>
    </div>
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-24 md:p-8">
      <div className="p-8 md:p-0">
        <Paragraph>
          In <Link href="https://blog.parkrun.com/uk/2021/11/22/scanning-from-mobile-devices/">November 2021</Link> parkrun HQ
          announced that virtual barcodes were now acceptable at their events, and that a physical barcode was no longer mandatory.
        </Paragraph>
        <Paragraph>
          As iPhones and Apple Watches have the <Link href="https://www.apple.com/wallet/">Apple Wallet</Link> feature that make ID passes and barcodes easily accessible,
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
        <SectionHeader>
          How do I use it on my iPhone?
        </SectionHeader>
        <Paragraph>
          Fill out the form with your details, and click "Generate Pass" to create a QR code. Scan it with your phone,
          and add the pass to your Apple Wallet.
        </Paragraph>
        <Paragraph>
          If you're filling this out on your iPhone, you can click the "Add to Apple Wallet" button to add the pass directly.
        </Paragraph>
        <Paragraph>
          After a run, simply double-click the side button to bring up your wallet, then tap on
          the <strong>dfyb.run</strong> pass to bring up your barcode. Simply present this to the scanners at the end of the run!
        </Paragraph>
        <SectionHeader>
          How do I use it on my Apple Watch?
        </SectionHeader>
        <Paragraph>
          If you have an Apple Watch linked to your iPhone, your barcode will automatically be carried across.
        </Paragraph>
        <Paragraph>
          After a run, double-click the side button to bring up your wallet, and scroll down to your <strong>dfyb.run</strong> pass.
          Tap it, and it will bring up your barcode. Simply present this to the scanners at the end of the run!
        </Paragraph>
        <SectionHeader>
          Do I still need a physical barcode?
        </SectionHeader>
        <Paragraph>
          <strong>Yes.</strong> This tool is still in beta - and you shouldn't trust it as your only barcode.
        </Paragraph>
        <Paragraph>
          Additionally, it is <strong>strongly</strong> advised that you carry your physical barcode for its emergency contact information.
          Adding your barcode to your Apple Wallet is designed just as a convenience!
        </Paragraph>
        <SectionHeader>
          Why is my barcode now a QR code?
        </SectionHeader>
        <Paragraph>
          The new <Link href="https://volunteer.parkrun.com/principles/virtual-volunteer">Virtual Volunteer app</Link> used by parkrun 
          can scan QR codes, as well as the traditional "Code-128" barcodes. While not officially supported, they work just fine. However,
          this is another reason why you should also carry a physical barcode as a backup while this is in beta.
        </Paragraph>
        <Paragraph>
          While Code-128 passes can be added to Apple Wallet and used on an iPhone, they can't be displayed on an Apple Watch, presumably
          due to screen size issues. For those of you who prefer the traditional barcode, I will add an option in a future update for that
          kind of pass.
        </Paragraph>
        <SectionHeader>
          Who made this?
        </SectionHeader>
        <Paragraph>
          This tool was made by Robert Sargant (<Link href="https://www.parkrun.org.uk/parkrunner/208864/all/">A208864</Link>) in order to scratch a personal itch.
          It's open source, and you can <Link href="https://github.com/sargant/dfyb.run">find it on Github</Link>!
        </Paragraph>
        <Paragraph>
          If you'd like to give me any feedback, you can find me <Link href="https://twitter.com/sargant">on Twitter</Link>.
        </Paragraph>
        <Paragraph>
          If you'd like to tip a little something to cover the costs of developing this, please go to <Link href="https://ko-fi.com/sargant">ko-fi.com/sargant</Link> 🙂
        </Paragraph>
      </div>
      <div>
        <BarcodeForm />
      </div>
    </div>
  </>
);

export default App;

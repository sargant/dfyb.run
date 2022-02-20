import { Heading, Link, Paragraph } from '../components'

export const FAQ: React.FC = () => (
  <div className="container mx-auto my-8 px-8 max-w-screen-sm">
    <Heading>
      How do I find my athlete ID?
    </Heading>
    <Paragraph>
      Your athlete ID, or parkrun ID, is the number printed at the bottom of your existing barcode,
      beginning with an &quot;A&quot; (e.g. <em>A208864</em>).
    </Paragraph>
    <Paragraph>
      If you have&apos;t got an existing barcode to hand, you can find a link to it in a results email you&apos;ve received,
      or by logging in <Link href="https://www.parkrun.com/profile/barcode/">here</Link> on the parkrun website.
    </Paragraph>
    <Heading>
     How do I use it on my iPhone?
    </Heading>
    <Paragraph>
      Fill out the form with your details, and click &quot;Generate Pass&quot; to create a QR code. Scan it with your phone,
      and add the pass to your Apple Wallet.
    </Paragraph>
    <Paragraph>
      If you&apos;re filling this out on your iPhone, you can click the &quot;Add to Apple Wallet&quot; button to add the pass directly.
    </Paragraph>
    <Paragraph>
      After a run, simply double-click the side button to bring up your wallet, then tap on
      the <strong>dfyb.run</strong> pass to bring up your barcode. Simply present this to the scanners at the end of the run!
    </Paragraph>
    <Heading>
      How do I use it on my Apple Watch?
    </Heading>
    <Paragraph>
      If you have an Apple Watch linked to your iPhone, your barcode will automatically be carried across.
    </Paragraph>
    <Paragraph>
      After a run, double-click the side button to bring up your wallet, and scroll down to your <strong>dfyb.run</strong> pass.
      Tap it, and it will bring up your barcode. Simply present this to the scanners at the end of the run!
    </Paragraph>
    <Heading>
      Do I still need a physical barcode?
    </Heading>
    <Paragraph>
      It&apos;s a good idea. What if your device runs out of battery?
    </Paragraph>
    <Paragraph>
      parkrun HQ strongly advises that you carry your physical barcode for its emergency contact information, but <strong>most importantly</strong>,
      you should set up <Link className="font-bold" href="https://support.apple.com/en-gb/HT207021">Medical ID</Link> on your iPhone, as this is
      the first place someone not familiar with parkrun would check in an emergency.
    </Paragraph>
    <Heading>
      Why does my watch show a QR code instead of a barcode?
    </Heading>
    <Paragraph>
      The Apple Watch cannot display traditional barcodes (known as <em>Code 128</em> barcodes) due to the size of the screen, and so
      displays a QR code instead.
    </Paragraph>
    <Paragraph>
      The new <Link href="https://volunteer.parkrun.com/principles/virtual-volunteer">Virtual Volunteer app</Link> used by parkrun
      can scan QR codes just fine. While not officially supported, they work great &mdash; and actually scan even faster!
    </Paragraph>
    <Heading>
      The barcode is showing on my phone, but isn&apos;t showing on my watch
    </Heading>
    <Paragraph>
      There is a <Link href="https://appleinsider.com/articles/22/01/29/apple-watch-wallet-sync-issues-found-following-watchos-84-ios-153-update">known bug</Link> introduced
      in iOS 15.3 and watchOS 8.4 that means barcodes may not be synced from phone to watch correctly.
    </Paragraph>
    <Paragraph>
      A workaround is to open the barcode pass on your phone, and share it to yourself via iMessage. Open the notification on your Apple Watch,
      and you will be able to install the pass directly on your watch.
    </Paragraph>
  </div>
)

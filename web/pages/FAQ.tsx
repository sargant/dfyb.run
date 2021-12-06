import { Heading, Link, Paragraph } from '@/web/components'

export const FAQ: React.FC = () => (
  <div className="container mx-auto max-w-screen-sm px-8 pb-8">
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
      <strong>Yes.</strong> This tool is still in beta - and you shouldn&apos;t trust it as your only barcode.
    </Paragraph>
    <Paragraph>
      Additionally, it is <strong>strongly</strong> advised that you carry your physical barcode for its emergency contact information.
      Adding your barcode to your Apple Wallet is designed just as a convenience!
    </Paragraph>
    <Heading>
      Why is my barcode now a QR code?
    </Heading>
    <Paragraph>
      The new <Link href="https://volunteer.parkrun.com/principles/virtual-volunteer">Virtual Volunteer app</Link> used by parkrun
      can scan QR codes, as well as the traditional &quot;Code 128&quot; barcodes. While not officially supported, they work just fine. However,
      this is another reason why you should also carry a physical barcode as a backup while this is in beta.
    </Paragraph>
    <Paragraph>
      If you want a traditional Code 128 barcode, uncheck the <em>&quot;I want to use an Apple Watch&quot;</em> option. The resulting pass will only work
      on your iPhone. You can add both the Code 128 and QR style passes to your wallet if you want to be sure your phone will scan!
    </Paragraph>
  </div>
)

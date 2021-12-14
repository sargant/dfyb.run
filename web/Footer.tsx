import IconGithub from '~icons/fa-brands/github-square'
import IconTwitter from '~icons/fa-brands/twitter-square'
import IconEnvelope from '~icons/fa-solid/envelope-square'

const FooterLink: React.FC<Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>> = ({ children, href }) => (
  <a className="hover:(text-primary dark:text-secondary) block flex flex-row items-center mx-8 mb-4 sm:mb-0" href={href}>
    {children}
  </a>
)

const Footer: React.FC = () => (
  <>
    <div className="flex flex-col sm:flex-row justify-center mx-auto mb-8 sm:mt-16 svg:(text-3xl mr-2)">
      <FooterLink href="https://github.com/sargant/dfyb.run">
        <IconGithub />
        <span>/sargant/dfyb.run</span>
      </FooterLink>
      <FooterLink href="https://twitter.com/dfyb_run">
        <IconTwitter /> @dfyb_run
      </FooterLink>
      <FooterLink href="mailto:hello@dfyb.run">
        <IconEnvelope /> hello@dfyb.run
      </FooterLink>
    </div>
    <div className="text-center opacity-50 m-8">
      This is an unofficial tool and is not affiliated with parkrun or Parkrun Limited
    </div>
  </>
)

export default Footer

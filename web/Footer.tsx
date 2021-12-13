import IconGithub from '~icons/fa-brands/github-square'
import IconTwitter from '~icons/fa-brands/twitter-square'
import IconEnvelope from '~icons/fa-solid/envelope-square'

const Footer: React.FC = () => (
  <div className="flex flex-row justify-center my-16 children:(block mx-8) svg:(text-4xl inline-block mr-2)">
    <a className="hover:text-secondary" href="https://github.com/sargant/dfyb.run">
      <IconGithub /> /sargant/dfyb.run
    </a>
    <a className="hover:text-secondary" href="https://twitter.com/dfyb_run">
      <IconTwitter /> @dfyb_run
    </a>
    <a className="hover:text-secondary" href="mailto:hello@dfyb.run">
      <IconEnvelope /> hello@dfyb.run
    </a>
  </div>
)

export default Footer

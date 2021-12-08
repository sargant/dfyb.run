import Icon from '@mdi/react'
import { mdiEmail, mdiGithub, mdiTwitter } from '@mdi/js'

const Footer: React.FC = () => (
  <div className="flex flex-row justify-center my-16">
    <a className="block mx-4 hover:text-secondary" href="mailto:hello@dfyb.run">
      <Icon path={mdiEmail} size={2} />
    </a>
    <a className="block mx-4 hover:text-secondary" href="https://twitter.com/dfyb_run">
      <Icon path={mdiTwitter} size={2} />
    </a>
    <a className="block mx-4 hover:text-secondary" href="https://github.com/sargant/dfyb.run">
      <Icon path={mdiGithub} size={2} />
    </a>
  </div>
)

export default Footer

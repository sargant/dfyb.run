import { Link, useLocation } from 'react-router-dom'

const HeaderLink: React.FC<{ path: string }> = ({ children, path }) => {
  const { pathname } = useLocation()

  const classNames = [
    'block',
    'w-1/3',
    'text-xl text-center',
    'font-header',
    'cursor-pointer',
    'p-4',
    'bg-white bg-opacity-0 hover:bg-opacity-10',
    pathname === path && 'underline text-secondary'
  ].join(' ')

  return (
    <Link to={path} className={classNames}>
      {children}
    </Link>
  )
}

const Header: React.FC = () => (
  <div className="bg-primary text-white">
    <div className="flex flex-col justify-center items-center text-center p-8 sm:px-32">
      <img src="/logo.svg" alt="dfyb.run logo" className="w-16 md:w-24" />
      <h1 className="text-4xl md:text-6xl font-header">
        dfyb.run <span className="text-secondary">beta</span>
      </h1>
      <p className="mt-6">
        Add your barcodes for a certain 5K and 2K <span className="whitespace-nowrap">run 🏃💨</span> to
        your <span className="whitespace-nowrap">iPhone 📱</span> and <span className="whitespace-nowrap">Apple Watch ⌚</span>
      </p>
      <p className="mt-4">
        Feedback? Comments?  📧 <a href="mailto:hello@dfyb.run" className="whitespace-nowrap underline">hello@dfyb.run</a> or tweet me at <a href="https://twitter.com/dfyb_run" className="whitespace-nowrap underline">@dfyb_run</a>
      </p>
    </div>
    <div className="bg-white/10">
      <div className="flex flex-row justify-center align-middle max-w-screen-sm mx-auto">
        <HeaderLink path="/">
          Home
        </HeaderLink>
        <HeaderLink path="/faq">
          FAQ
        </HeaderLink>
        <HeaderLink path="/privacy">
          Privacy
        </HeaderLink>
      </div>
    </div>
  </div>
)

export default Header

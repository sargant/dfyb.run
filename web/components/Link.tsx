
export const Link: React.FC<Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>> = ({ href, className, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`
      underline
      text-primary
      dark:text-secondary
      hover:no-underline
      whitespace-nowrap
      ${className ?? ''}
    `}>
    {children}
  </a>
)

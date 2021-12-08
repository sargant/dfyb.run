export const Heading: React.FC<Partial<Pick<HTMLHeadingElement, 'className'>>> = ({ className = '', children }) => (
  <h3 className={`
    text-primary
    dark:text-secondary
    font-header
    font-bold
    text-xl
    not-first-of-type:mt-8
    mb-2
    ${className}
  `}>
    {children}
  </h3>
)

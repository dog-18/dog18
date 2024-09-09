import { ExternalLink } from 'c/ExternalLink'
import { Links } from 'l/constants'

export const Footer = () => (
  <footer className='p-4'>
    <div className='container mx-auto text-center'>
      <ExternalLink
        className='text-lg'
        href={Links.GITHUB}
      >
        GitHub
      </ExternalLink>
    </div>
  </footer>
)

import type { Links } from 'l/types'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'

interface ExternalLinkProps {
  children: ReactNode
  className?: string
  href: Links
}

export const ExternalLink: FC<ExternalLinkProps> = ({
  children,
  className,
  href,
}: ExternalLinkProps) => (
  <Link className={className} href={href} rel='noopener noreferrer' target='_blank'>
    {children}
  </Link>
)

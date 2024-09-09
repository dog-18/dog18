import './globals.css'
import { Layout } from 'c/Layout'

export { metadata } from 'l/config'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

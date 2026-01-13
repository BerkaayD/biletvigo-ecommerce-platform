import type { Metadata } from 'next'
import './global.css'

export const metadata: Metadata = {
    title: 'E-Ticaret Sitesi',
    description: 'E-ticaret Platformu',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
            <body className="font-sans antialiased">
                {children}</body>
        </html>
    )
}
import './globals.css'

export const metadata = {
    title: 'FinanceWise - Student Money Tracker',
    description: 'Smart financial tracking for students with AI insights.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    )
}

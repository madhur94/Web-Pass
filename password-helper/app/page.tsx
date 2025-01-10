'use client'

import { useState, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Shuffle } from 'lucide-react'

interface Website {
  name: string
  url: string
  icon: string
}

export default function PasswordChangePage() {
  const [newPassword, setNewPassword] = useState<string>('')
  const [showLinks, setShowLinks] = useState<boolean>(false)

  const websites: Website[] = [
    {
      name: 'Google',
      url: 'https://myaccount.google.com/signinoptions/password',
      icon: '🔍'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/settings?tab=security',
      icon: '👤'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/settings/password',
      icon: '🐦'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/psettings/password',
      icon: '💼'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/settings/security',
      icon: '💻'
    }
  ]

  const generateRandomPassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    const allChars = uppercase + lowercase + numbers + symbols
    let password = ''
    
    // Ensure at least one of each type
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += symbols[Math.floor(Math.random() * symbols.length)]
    
    // Fill remaining 8 characters randomly
    for(let i = 0; i < 8; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    password = password.split('')
      .sort(() => Math.random() - 0.5)
      .join('')
    
    setNewPassword(password)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowLinks(true)
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Password Change Helper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription>
              Remember: Using unique passwords for each site is more secure than using the same password everywhere.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={generateRandomPassword}
                  className="flex gap-2 items-center"
                >
                  <Shuffle className="w-4 h-4" />
                  Generate
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Show Password Change Links
            </Button>
          </form>

          {showLinks && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Click each link to change your password:</h3>
              <div className="grid gap-3">
                {websites.map((site) => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="mr-2">{site.icon}</span>
                    <span>{site.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Your new password:</h4>
                <code className="block p-2 bg-white rounded border">
                  {newPassword}
                </code>
                <p className="mt-2 text-sm text-gray-600">
                  Copy this password to use on each site
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
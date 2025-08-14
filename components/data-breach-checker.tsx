"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BreachResult {
  email: string
  breaches: Array<{
    name: string
    date: string
    compromisedData: string[]
    description: string
  }>
  isCompromised: boolean
}

export function DataBreachChecker() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BreachResult | null>(null)
  const { toast } = useToast()

  // Mock data for demonstration - in a real app, you'd use HaveIBeenPwned API
  const mockBreaches = [
    {
      name: "Adobe",
      date: "2013-10-04",
      compromisedData: ["Email addresses", "Password hints", "Passwords", "Usernames"],
      description:
        "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text.",
    },
    {
      name: "LinkedIn",
      date: "2012-05-05",
      compromisedData: ["Email addresses", "Passwords"],
      description: "In May 2012, LinkedIn was breached and the passwords of 164 million users were stolen.",
    },
    {
      name: "Dropbox",
      date: "2012-07-01",
      compromisedData: ["Email addresses", "Passwords"],
      description:
        "In mid-2012, Dropbox suffered a data breach which exposed the stored credentials of tens of millions of their customers.",
    },
  ]

  const checkEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock logic - randomly determine if email is compromised
    const isCompromised = Math.random() > 0.6
    const breaches = isCompromised ? mockBreaches.slice(0, Math.floor(Math.random() * 3) + 1) : []

    setResult({
      email,
      breaches,
      isCompromised,
    })

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email-input">Email Address</Label>
          <div className="flex gap-2">
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              onKeyDown={(e) => e.key === "Enter" && checkEmail()}
            />
            <Button onClick={checkEmail} disabled={loading}>
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>This tool checks if your email has been compromised in known data breaches.</p>
          <p>Note: This is a demo using mock data. In production, this would use the HaveIBeenPwned API.</p>
        </div>
      </div>

      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Breach Check Results</h4>
                <Badge
                  variant={result.isCompromised ? "destructive" : "default"}
                  className={
                    result.isCompromised ? "" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }
                >
                  {result.isCompromised ? (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Compromised
                    </>
                  ) : (
                    <>
                      <Shield className="h-3 w-3 mr-1" />
                      Safe
                    </>
                  )}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Email: <span className="font-mono">{result.email}</span>
              </p>

              {result.isCompromised ? (
                <div className="space-y-4">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Your email was found in {result.breaches.length} data breach{result.breaches.length > 1 ? "es" : ""}
                    .
                  </p>

                  <div className="space-y-3">
                    {result.breaches.map((breach, index) => (
                      <Card key={index} className="border-red-200 dark:border-red-800">
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium">{breach.name}</h5>
                              <Badge variant="outline" className="text-xs">
                                {new Date(breach.date).toLocaleDateString()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{breach.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {breach.compromisedData.map((data, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {data}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950">
                    <CardContent className="pt-4">
                      <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Recommended Actions</h5>
                      <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                        <li>• Change your password immediately if you still use the same one</li>
                        <li>• Enable two-factor authentication on all accounts</li>
                        <li>• Monitor your accounts for suspicious activity</li>
                        <li>• Use unique passwords for each account</li>
                        <li>• Consider using a password manager</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Good news! Your email wasn't found in any known data breaches.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Keep practicing good security habits to stay protected.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

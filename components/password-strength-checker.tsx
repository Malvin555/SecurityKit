"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface PasswordAnalysis {
  score: number
  strength: string
  color: string
  feedback: string[]
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
    common: boolean
  }
}

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState("")
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null)

  const commonPasswords = [
    "password",
    "123456",
    "password123",
    "admin",
    "qwerty",
    "letmein",
    "welcome",
    "monkey",
    "dragon",
    "master",
    "hello",
    "login",
  ]

  const analyzePassword = (pwd: string): PasswordAnalysis => {
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      symbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
      common: !commonPasswords.some((common) => pwd.toLowerCase().includes(common.toLowerCase())),
    }

    let score = 0
    const feedback: string[] = []

    if (checks.length) score += 25
    else feedback.push("Use at least 12 characters")

    if (checks.uppercase) score += 15
    else feedback.push("Include uppercase letters")

    if (checks.lowercase) score += 15
    else feedback.push("Include lowercase letters")

    if (checks.numbers) score += 15
    else feedback.push("Include numbers")

    if (checks.symbols) score += 20
    else feedback.push("Include special characters")

    if (checks.common) score += 10
    else feedback.push("Avoid common passwords and dictionary words")

    // Bonus points for length
    if (pwd.length >= 16) score += 5
    if (pwd.length >= 20) score += 5

    let strength: string
    let color: string

    if (score >= 85) {
      strength = "Very Strong"
      color = "text-green-600"
    } else if (score >= 70) {
      strength = "Strong"
      color = "text-blue-600"
    } else if (score >= 50) {
      strength = "Moderate"
      color = "text-yellow-600"
    } else if (score >= 30) {
      strength = "Weak"
      color = "text-orange-600"
    } else {
      strength = "Very Weak"
      color = "text-red-600"
    }

    return { score, strength, color, feedback, checks }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (value) {
      setAnalysis(analyzePassword(value))
    } else {
      setAnalysis(null)
    }
  }

  const getIcon = (passed: boolean) => {
    return passed ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="password-input">Enter Password to Analyze</Label>
        <Input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Type your password here..."
          className="font-mono"
        />
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Password Strength</Label>
              <Badge variant="outline" className={analysis.color}>
                {analysis.strength}
              </Badge>
            </div>
            <Progress value={analysis.score} className="h-2" />
            <p className="text-sm text-muted-foreground">Score: {analysis.score}/100</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Security Checks
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    {getIcon(analysis.checks.length)}
                    <span>At least 12 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getIcon(analysis.checks.uppercase)}
                    <span>Contains uppercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getIcon(analysis.checks.lowercase)}
                    <span>Contains lowercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getIcon(analysis.checks.numbers)}
                    <span>Contains numbers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getIcon(analysis.checks.symbols)}
                    <span>Contains special characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getIcon(analysis.checks.common)}
                    <span>Not a common password</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {analysis.feedback.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-3">Recommendations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {analysis.feedback.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

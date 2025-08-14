"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, AlertTriangle, Shield } from "lucide-react"

interface AuditItem {
  id: string
  category: string
  title: string
  description: string
  importance: "high" | "medium" | "low"
  completed: boolean
}

export function SecurityAudit() {
  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    {
      id: "2fa",
      category: "Authentication",
      title: "Enable Two-Factor Authentication",
      description: "Use 2FA on all important accounts (email, banking, social media)",
      importance: "high",
      completed: false,
    },
    {
      id: "password-manager",
      category: "Passwords",
      title: "Use a Password Manager",
      description: "Store all passwords in a secure password manager",
      importance: "high",
      completed: false,
    },
    {
      id: "unique-passwords",
      category: "Passwords",
      title: "Use Unique Passwords",
      description: "Never reuse passwords across different accounts",
      importance: "high",
      completed: false,
    },
    {
      id: "software-updates",
      category: "System Security",
      title: "Keep Software Updated",
      description: "Regularly update OS, browsers, and applications",
      importance: "high",
      completed: false,
    },
    {
      id: "antivirus",
      category: "System Security",
      title: "Use Antivirus Software",
      description: "Install and maintain updated antivirus protection",
      importance: "medium",
      completed: false,
    },
    {
      id: "firewall",
      category: "Network Security",
      title: "Enable Firewall",
      description: "Use built-in or third-party firewall protection",
      importance: "medium",
      completed: false,
    },
    {
      id: "secure-wifi",
      category: "Network Security",
      title: "Secure Wi-Fi Networks",
      description: "Use WPA3 encryption and avoid public Wi-Fi for sensitive tasks",
      importance: "medium",
      completed: false,
    },
    {
      id: "backup-data",
      category: "Data Protection",
      title: "Regular Data Backups",
      description: "Backup important data regularly using 3-2-1 rule",
      importance: "medium",
      completed: false,
    },
    {
      id: "privacy-settings",
      category: "Privacy",
      title: "Review Privacy Settings",
      description: "Check and adjust privacy settings on social media and online accounts",
      importance: "medium",
      completed: false,
    },
    {
      id: "email-security",
      category: "Email Security",
      title: "Email Security Practices",
      description: "Be cautious with email attachments and links from unknown sources",
      importance: "low",
      completed: false,
    },
    {
      id: "browser-security",
      category: "Browser Security",
      title: "Secure Browser Settings",
      description: "Use secure browser settings and consider privacy-focused extensions",
      importance: "low",
      completed: false,
    },
    {
      id: "social-engineering",
      category: "Awareness",
      title: "Social Engineering Awareness",
      description: "Learn to recognize and avoid social engineering attacks",
      importance: "low",
      completed: false,
    },
  ])

  const toggleItem = (id: string) => {
    setAuditItems((items) => items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedItems = auditItems.filter((item) => item.completed).length
  const totalItems = auditItems.length
  const completionPercentage = Math.round((completedItems / totalItems) * 100)

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "text-red-600 border-red-600"
      case "medium":
        return "text-yellow-600 border-yellow-600"
      case "low":
        return "text-blue-600 border-blue-600"
      default:
        return "text-gray-600 border-gray-600"
    }
  }

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Shield className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const categories = [...new Set(auditItems.map((item) => item.category))]

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Audit Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedItems} of {totalItems} completed
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Security Score: {completionPercentage}%</span>
              <span>
                {completionPercentage >= 80
                  ? "Excellent"
                  : completionPercentage >= 60
                    ? "Good"
                    : completionPercentage >= 40
                      ? "Fair"
                      : "Needs Improvement"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Checklist by Category */}
      {categories.map((category) => {
        const categoryItems = auditItems.filter((item) => item.category === category)
        const categoryCompleted = categoryItems.filter((item) => item.completed).length

        return (
          <Card key={category}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category}</CardTitle>
                <Badge variant="outline">
                  {categoryCompleted}/{categoryItems.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={item.id}
                          className={`font-medium cursor-pointer ${
                            item.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {item.title}
                        </label>
                        <Badge variant="outline" className={`text-xs ${getImportanceColor(item.importance)}`}>
                          {getImportanceIcon(item.importance)}
                          <span className="ml-1 capitalize">{item.importance}</span>
                        </Badge>
                      </div>
                      <p className={`text-sm ${item.completed ? "text-muted-foreground" : "text-muted-foreground"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Security Tips */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">💡 Security Tips</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
            <li>• Start with high-priority items first - they provide the most security benefit</li>
            <li>• Security is an ongoing process, not a one-time setup</li>
            <li>• Stay informed about new threats and security best practices</li>
            <li>• Consider professional security training for your organization</li>
            <li>• Regularly review and update your security measures</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

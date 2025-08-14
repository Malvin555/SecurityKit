import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Key,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PasswordGenerator } from "@/components/password-generator";
import { PasswordStrengthChecker } from "@/components/password-strength-checker";
import { DataBreachChecker } from "@/components/data-breach-checker";
import { SecurityAudit } from "@/components/security-audit";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  SecureKit
                </h1>
                <p className="text-sm text-muted-foreground">
                  Password Security Toolkit
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
                Secure Connection
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Strengthen Your Digital Security
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive password security tools to protect your accounts and
            data. Generate strong passwords, check for breaches, and audit your
            security posture.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>No data stored</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Client-side processing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Open source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tools Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Password Generator */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Password Generator</CardTitle>
                    <CardDescription>
                      Generate cryptographically secure passwords
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PasswordGenerator />
              </CardContent>
            </Card>

            {/* Password Strength Checker */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Password Strength Checker</CardTitle>
                    <CardDescription>
                      Analyze password security and get improvement tips
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PasswordStrengthChecker />
              </CardContent>
            </Card>

            {/* Data Breach Checker */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>Data Breach Checker</CardTitle>
                    <CardDescription>
                      Check if your email has been compromised in data breaches
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DataBreachChecker />
              </CardContent>
            </Card>

            {/* Security Audit */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Security Audit</CardTitle>
                    <CardDescription>
                      Comprehensive security checklist and recommendations
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <SecurityAudit />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            Built with security in mind. All processing happens locally in your
            browser.
          </p>
        </div>
      </footer>
    </div>
  );
}

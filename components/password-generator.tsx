"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      })
      return
    }

    let result = ""
    const array = new Uint8Array(length[0])
    crypto.getRandomValues(array)

    for (let i = 0; i < length[0]; i++) {
      result += charset[array[i] % charset.length]
    }

    setPassword(result)
  }

  const copyToClipboard = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="generated-password">Generated Password</Label>
        <div className="flex gap-2">
          <Input
            id="generated-password"
            value={password}
            readOnly
            placeholder="Click generate to create a password"
            className="font-mono"
          />
          <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Password Length: {length[0]}</Label>
          <Slider value={length} onValueChange={setLength} max={128} min={4} step={1} className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            <Label htmlFor="lowercase">Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            <Label htmlFor="numbers">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            <Label htmlFor="symbols">Symbols (!@#$)</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="exclude-similar" checked={excludeSimilar} onCheckedChange={setExcludeSimilar} />
          <Label htmlFor="exclude-similar">Exclude similar characters (i, l, 1, L, o, 0, O)</Label>
        </div>
      </div>

      <Button onClick={generatePassword} className="w-full">
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate Password
      </Button>
    </div>
  )
}

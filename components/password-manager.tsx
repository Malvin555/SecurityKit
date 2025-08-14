import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, Key, AlertCircle } from "lucide-react"

export function PasswordManager() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">Password Health</span>
        <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
          Manage
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-400">Strong Passwords</span>
          <span className="text-sm text-green-400">23/28</span>
        </div>
        <Progress value={82} className="h-2" />

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-4 w-4 text-green-400" />
              <span className="text-xs text-slate-400">Secure</span>
            </div>
            <div className="text-lg font-bold text-green-400">23</div>
          </div>

          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-xs text-slate-400">Weak</span>
            </div>
            <div className="text-lg font-bold text-red-400">5</div>
          </div>
        </div>

        <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800">
          <div className="flex items-center gap-2 text-blue-400">
            <Key className="h-4 w-4" />
            <span className="text-sm">2FA enabled on 18 accounts</span>
          </div>
        </div>
      </div>
    </div>
  )
}

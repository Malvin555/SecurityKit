import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react"

export function SecurityDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Security Score */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-serif flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Security Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-400 mb-2">94/100</div>
          <Progress value={94} className="h-2 mb-2" />
          <p className="text-sm text-slate-400">Excellent security posture</p>
        </CardContent>
      </Card>

      {/* Active Threats */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-serif flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Active Threats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-400 mb-2">2</div>
          <div className="flex gap-2 mb-2">
            <Badge variant="destructive" className="text-xs">
              High
            </Badge>
            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
              Medium
            </Badge>
          </div>
          <p className="text-sm text-slate-400">Requires attention</p>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-serif flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-400 mb-2">Online</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">All systems operational</span>
          </div>
          <p className="text-sm text-slate-400">Last check: 30s ago</p>
        </CardContent>
      </Card>

      {/* Activity Monitor */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-serif flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" />
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
          <div className="text-sm text-slate-400 mb-2">Events today</div>
          <div className="flex justify-between text-xs">
            <span className="text-green-400">Safe: 1,203</span>
            <span className="text-red-400">Blocked: 44</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield } from "lucide-react"

export function ThreatMonitor() {
  const threats = [
    { id: 1, type: "Malware", severity: "High", status: "Blocked", time: "2 min ago" },
    { id: 2, type: "Phishing", severity: "Medium", status: "Quarantined", time: "15 min ago" },
    { id: 3, type: "Suspicious IP", severity: "Low", status: "Monitoring", time: "1 hour ago" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">Recent Threats</span>
        <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {threats.map((threat) => (
          <div
            key={threat.id}
            className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-sm font-medium text-white">{threat.type}</p>
                <p className="text-xs text-slate-400">{threat.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  threat.severity === "High" ? "destructive" : threat.severity === "Medium" ? "secondary" : "outline"
                }
                className="text-xs"
              >
                {threat.severity}
              </Badge>
              <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                {threat.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center p-4 bg-green-900/20 rounded-lg border border-green-800">
        <div className="flex items-center gap-2 text-green-400">
          <Shield className="h-4 w-4" />
          <span className="text-sm">Real-time protection active</span>
        </div>
      </div>
    </div>
  )
}

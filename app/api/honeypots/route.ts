import { NextResponse } from "next/server";

let initialHoneypotState = {
  active_profile: "Aggressive Tarpit Isolation",
  decoy_ports: [2222, 3306, 5432, 8080, 27017],
  fake_credentials_bait: [
    { type: "Decoy AWS Key", key: "AKIAIOSFODNN7EXAMPLE_BAIT", status: "Active Bait" },
    { type: "Decoy SSH Credential", user: "admin_root_decoy", pass: "P@ssw0rd2026!", status: "Trap Set" },
    { type: "Mock Postgres Table", table: "customer_credit_cards_mock", status: "Monitoring Select Queries" },
  ],
  adaptive_delay_ms: 2400,
  tarpit_enabled: true,
  captured_payloads_count: 142,
  logs: [
    { timestamp: "10:14:02 AM", ip: "185.220.101.5", action: "Port 2222 SSH Password Spray", payload: "admin/123456", status: "Trapped in Tarpit" },
    { timestamp: "10:12:45 AM", ip: "203.0.113.88", action: "SELECT query on mock table", payload: "SELECT * FROM customer_credit_cards_mock", status: "Payload Isolated" },
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialHoneypotState,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { threat_severity, traffic_volume_rpm, attacker_ip } = body;

    const isHigh = threat_severity === "HIGH" || threat_severity === "CRITICAL" || Number(traffic_volume_rpm || 0) > 1000;

    initialHoneypotState = {
      ...initialHoneypotState,
      active_profile: isHigh ? "Aggressive Tarpit Isolation" : "Standard Decoy Trap",
      adaptive_delay_ms: isHigh ? Math.floor(Math.random() * 2000 + 1500) : 200,
      tarpit_enabled: isHigh,
      captured_payloads_count: initialHoneypotState.captured_payloads_count + 1,
      logs: [
        {
          timestamp: new Date().toLocaleTimeString(),
          ip: attacker_ip || "185.220.101.5",
          action: "Dynamic Honeypot Trapping",
          payload: "Unidentified Exploitation Spray",
          status: isHigh ? "Trapped in Tarpit" : "Logged & Monitored",
        },
        ...initialHoneypotState.logs,
      ],
    };

    return NextResponse.json({
      success: true,
      message: "Dynamic Honeypot parameters adapted successfully.",
      data: initialHoneypotState,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to adapt honeypot parameters." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ip = (body?.ip_address || "185.220.101.5").trim();

    const isVPN = ip.startsWith("185.") || ip.startsWith("203.") || ip.endsWith(".1");
    const threatScore = isVPN ? 92 : 34;

    const data = {
      ip,
      country: ip.startsWith("203.") ? "Japan" : ip.startsWith("185.") ? "Germany" : "United States",
      city: ip.startsWith("203.") ? "Tokyo" : ip.startsWith("185.") ? "Frankfurt" : "New York",
      latitude: ip.startsWith("203.") ? 35.6762 : ip.startsWith("185.") ? 50.1109 : 40.7128,
      longitude: ip.startsWith("203.") ? 139.6503 : ip.startsWith("185.") ? 8.6821 : -74.006,
      isp: isVPN ? "M247 Ltd Tor Exit Node" : "Cloudflare Datacenter AS13335",
      vpn_proxy_detected: isVPN,
      threat_score: threatScore,
      attack_vector: "Automated Credential Stuffing Botnet",
      target_soc_coordinates: { lat: 20.2961, lng: 85.8245 }, // Bhubaneswar Command Center
    };

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to resolve IP threat geolocation." }, { status: 500 });
  }
}

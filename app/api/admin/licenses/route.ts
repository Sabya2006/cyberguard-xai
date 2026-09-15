import { NextResponse } from "next/server";

let customers = [
  { id: "CUST-104", name: "BPUT Odisha University", email: "admin@bput.ac.in", plan: "Business", mrr: 4999, usage: "18,420 / 25,000", status: "Active" },
  { id: "CUST-103", name: "Apex Financial Corp", email: "sec@apexfin.com", plan: "Enterprise", mrr: 24999, usage: "142,800 / Unlimited", status: "Active" },
  { id: "CUST-102", name: "Starlight Cyber Labs", email: "info@starlight.io", plan: "Starter", mrr: 999, usage: "840 / 1,000", status: "Active" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: customers,
    mrrTotal: customers.reduce((acc, c) => acc + c.mrr, 117503),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, plan } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Organization name and email are required." }, { status: 400 });
    }

    const selectedPlan = plan || "Business";
    const mrrVal = selectedPlan === "Starter" ? 999 : selectedPlan === "Business" ? 4999 : 24999;
    const quotaVal = selectedPlan === "Starter" ? "0 / 1,000" : selectedPlan === "Business" ? "0 / 25,000" : "0 / Unlimited";

    const newCustomer = {
      id: `CUST-${105 + customers.length}`,
      name,
      email,
      plan: selectedPlan,
      mrr: mrrVal,
      usage: quotaVal,
      status: "Active",
    };

    customers = [newCustomer, ...customers];

    return NextResponse.json({
      success: true,
      message: `Provisioned ${selectedPlan} license for ${name}`,
      customer: newCustomer,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer license." }, { status: 500 });
  }
}

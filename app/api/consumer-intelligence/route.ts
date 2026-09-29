import { NextResponse } from "next/server";

let initialReviews = [
  {
    id: "INTEL-101",
    target: "secure-bput-portal.xyz",
    target_type: "domain",
    risk_score: 96,
    community_rating: 1.2,
    review_count: 48,
    trust_label: "CRITICAL MALICIOUS PHISHING DOMAIN",
    recent_reviews: [
      { user: "Ananya P.", comment: "Sent fake exam fee payment link. Money deducted immediately.", upvotes: 24, date: "1 day ago" },
      { user: "Rahul M.", comment: "Domain registered 2 days ago. Fake SSL badge.", upvotes: 19, date: "2 days ago" },
    ],
  },
  {
    id: "INTEL-102",
    target: "+91 98765 43210",
    target_type: "phone",
    risk_score: 88,
    community_rating: 1.5,
    review_count: 32,
    trust_label: "SUSPECTED TELECOM IMPERSONATION",
    recent_reviews: [
      { user: "Vikram S.", comment: "Claimed to be Electricity Department threatening disconnection.", upvotes: 31, date: "3 hours ago" },
    ],
  },
  {
    id: "INTEL-103",
    target: "refund-support@bput.ac.in",
    target_type: "email",
    risk_score: 12,
    community_rating: 4.8,
    review_count: 110,
    trust_label: "VERIFIED OFFICIAL ENTITY",
    recent_reviews: [
      { user: "Priya R.", comment: "Official university refund portal desk. Verified safe.", upvotes: 88, date: "1 week ago" },
    ],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("query") || "";

  if (q) {
    const filtered = initialReviews.filter((item) =>
      item.target.toLowerCase().includes(q.toLowerCase())
    );
    return NextResponse.json({ success: true, data: filtered });
  }

  return NextResponse.json({ success: true, data: initialReviews });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { target, target_type, comment, rating, author } = body;

    if (!target || !comment) {
      return NextResponse.json({ error: "Target entity and review comment are required." }, { status: 400 });
    }

    const existingIndex = initialReviews.findIndex((r) => r.target.toLowerCase() === target.toLowerCase());

    const newReview = {
      user: author || "Anonymous Contributor",
      comment,
      upvotes: 1,
      date: "Just now",
    };

    if (existingIndex >= 0) {
      initialReviews[existingIndex].review_count += 1;
      initialReviews[existingIndex].recent_reviews.unshift(newReview);
    } else {
      const createdItem = {
        id: `INTEL-${104 + initialReviews.length}`,
        target,
        target_type: target_type || "domain",
        risk_score: rating < 3 ? 85 : 15,
        community_rating: Number(rating || 1.5),
        review_count: 1,
        trust_label: rating < 3 ? "COMMUNITY FLAGGED UNTRUSTED ENTITY" : "VERIFIED COMMUNITY SAFE",
        recent_reviews: [newReview],
      };
      initialReviews.unshift(createdItem);
    }

    return NextResponse.json({
      success: true,
      message: "Consumer review submitted and indexed successfully.",
      data: initialReviews,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit consumer review." }, { status: 500 });
  }
}

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cyberguard-xai.io";
  return [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/pricing`, lastModified: new Date() },
    { url: `${baseUrl}/auth`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/phishing`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/url-scanner`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/deepfake`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/behaviour`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/incidents`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/reports`, lastModified: new Date() },
    { url: `${baseUrl}/dashboard/admin`, lastModified: new Date() },
  ];
}

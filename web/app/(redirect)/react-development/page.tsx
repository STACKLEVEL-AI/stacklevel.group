import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectPreferredLocale } from "@/app/lib/request-locale";

export default async function ReactDevelopmentRedirectPage() {
  const requestHeaders = await headers();
  const locale = detectPreferredLocale(requestHeaders.get("accept-language"));

  redirect(`/${locale}/hire-react-developers`);
}

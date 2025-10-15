// create interface with [slug] as string[] and use it in the component

// ✅ In Next.js 15, the [params] and [searchParams] props are Promises —
// so we make the component [async] and [await] their values

export default async function ProductPage({
  // ✅ Destructure [params] and [searchParams] directly
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>; // ✅ optional catch-all ([...slug]) returns undefined if no segment
  searchParams?: Promise<{ sortOrder?: string }>; // ✅ optional query string (?sortOrder=...)
}) {
  // ✅ Await both Promises from Next.js
  const { slug } = await params;
  const { sortOrder } = (await searchParams) ?? {};

  return (
    <div>
      {/* ✅ Fallbacks and formatting */}
      ProductPage {slug?.join("/")} - Sorted by {sortOrder ?? "default"}
    </div>
  );
}

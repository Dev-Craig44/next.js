// ✅ We no longer use a separate interface because Next.js 15 expects params/searchParams to be typed inline in the component function

// ✅ The component must be an async function to work with Next.js 15's server routing model
export default async function ProductPage({
  // ✅ Destructure slug from params, which is provided by Next.js
  params,
  // ✅ Destructure sortOrder from searchParams if it exists (optional)
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>; // ✅ Optional catch-all route ([...slug])
  searchParams: Promise<{ sortOrder?: string }>; // ✅ Optional query string (?sortOrder=name)
}) {
  const { slug } = await params; // ✅ Await the promise to get the actual slug value
  const { sortOrder } = await searchParams; // ✅ Await the promise to get the actual sortOrder value
  return (
    <div>
      {/* ✅ Safely handle optional slug and sortOrder */}
      ProductPage {slug?.join("/")} - Sorted by {sortOrder ?? "default"}
    </div>
  );
}

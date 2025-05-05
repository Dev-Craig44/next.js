// ✅ Access route parameters for nested dynamic segments using Next.js 15 conventions
export default async function PhotoDetailPage({
  // ✅ Destructure both `id` and `photoId` from the awaited `params` prop
  params,
}: {
  params: Promise<{ id: string; photoId: string }>; // 🧠 Route params are always strings in the URL
}) {
  const { id, photoId } = await params;

  return (
    <div>
      User: {id} Photo: {photoId}
    </div>
  );
}

// pages/[userId]/page.tsx
import UserLiveForm from "./userLive-form"

export default async function UserPage({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <UserLiveForm userId={params.userId} />
}

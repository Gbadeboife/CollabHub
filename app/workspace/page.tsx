import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Workspace() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Workspace</h1>
      <p>Welcome to your workspace, {user.email}!</p>
    </div>
  );
}
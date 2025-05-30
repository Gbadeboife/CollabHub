import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const supabase = await createClient();

    const { error } = await supabase
      .from('Tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

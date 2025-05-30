import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const updateData = await request.json();
    const { category } = updateData;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('Tasks')
      .update({ category })
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ task: data }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

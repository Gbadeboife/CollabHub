import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(  req: Request,
  { params }: { params: { workspaceId: string } }
) {
    try{
        const { workspaceId } = params

        const supabase = await createClient();


        const { data: tasks, error } = await supabase
        .from('Tasks')
        .select('*')
        .eq('workspace_id', workspaceId)
        

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        return NextResponse.json({ tasks }, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
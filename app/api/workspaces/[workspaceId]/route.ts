import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(  req: Request,
  { params }: { params: { workspaceId: string } }
) {
    try{
        const { workspaceId } = await params;
        const workspaceIdNum = parseInt(workspaceId, 10);

        const supabase = await createClient();

        // Fetch workspace
        const { data, error: workspaceError } = await supabase
        .from('Workspaces')
        .select('*')
        .eq('id', workspaceIdNum)
        .single();

        if (workspaceError) {
        return NextResponse.json({ error: workspaceError.message }, { status: 404 });
        }

        return NextResponse.json( data , { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(  req: Request,
  { params }: { params: { workspaceId: string } }
) {
    try{
        const { workspaceId } = params;

        const supabase = await createClient();

        // Fetch workspace
        const { data: workspace, error: workspaceError } = await supabase
        .from('Workspaces')
        .select('*')
        .eq('id', workspaceId)
        .single();

        if (workspaceError) {
        return NextResponse.json({ error: workspaceError.message }, { status: 404 });
        }

        // Fetch channels for workspace
        const { data, error: channelsError } = await supabase
        .from('Workspaces')
        .select('*')
        .eq('workspace_id', workspaceId);

        if (channelsError) {
            return NextResponse.json({ error: channelsError.message }, { status: 404 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
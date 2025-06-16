import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(  request: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> | { workspaceId: string } }
) {
    try{
        const resolvedParams = await Promise.resolve(params);
        const { workspaceId } = resolvedParams;

        const supabase = await createClient();


        const { data: messages, error } = await supabase
        .from('Messages')
        .select('*')
        .eq('workspace_id', workspaceId)
        

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        return NextResponse.json({ messages }, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
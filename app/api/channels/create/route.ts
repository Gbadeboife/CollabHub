import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try{
        const supabase = await createClient();
        const channelData = await request.json();
        const { name, isPrivate, workspaceId } = channelData;
        
        const is_private= isPrivate
        const workspace_id= workspaceId
        

        const { data, error } = await supabase
        .from('Channels')
        .insert([{ name, is_private, workspace_id }]) 

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return new NextResponse(null, { status: 201 })

    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try{
        const supabase = await createClient();
        const messageData = await request.json();
        const { content, userId, isOwn, workspaceId, timestamp } = messageData;
        
        const user_id= userId
        const workspace_id= workspaceId
        const is_own= isOwn

        const { data, error } = await supabase
        .from('Messages')
        .insert([{ is_own, user_id, content, workspace_id, timestamp }]) 

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return new NextResponse(null, { status: 201 })

    } catch (error) {
        console.error("Error creating workspace:", error);
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
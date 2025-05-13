import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try{
        const supabase = await createClient();
        const memberData = await request.json();
        const { workspaceId, userId, role } = memberData;
        
        const user_id= userId
        const workspace_id= workspaceId
        console.log("userId", user_id)

        const { data, error } = await supabase
        .from('Workspace_members')
        .insert([{ user_id, role, workspace_id }]) 

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
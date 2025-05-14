import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try{
        const supabase = await createClient();
        const workspaceData = await request.json();
        const { name, ownerId } = workspaceData;
        
        const owner_id= ownerId
      

        const { data, error } = await supabase
        .from('Workspaces')
        .insert([{ name, owner_id }]) 

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
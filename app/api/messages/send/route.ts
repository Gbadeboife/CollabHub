import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try{
        const supabase = await createClient();
        const messageData = await request.json();
        const { channelId, content, userId } = messageData;
        
        const user_id= userId
        const channel_id= channelId
      

        const { data, error } = await supabase
        .from('Messages')
        .insert([{channel_id , user_id, content }]) 

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
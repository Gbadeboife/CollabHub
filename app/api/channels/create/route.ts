import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const channelData = await request.json();
        const { name, isPrivate, workspaceId, icon } = channelData;
        
        const is_private = isPrivate;
        const workspace_id = workspaceId;

        // Create the channel
        const { data, error: channelError } = await supabase
        .from('Channels')
        .insert([{ name, is_private, workspace_id, icon }])
        .select('id');

        if (channelError || !data) {
            return NextResponse.json({ error: channelError?.message }, { status: 400 });
        }

        const channelId = data[0].id;
        return NextResponse.json({ id: channelId }, { status: 201 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
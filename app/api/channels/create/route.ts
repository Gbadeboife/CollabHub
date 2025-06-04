import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const channelData = await request.json();
        const { name, isPrivate, workspaceId } = channelData;
        
        const is_private = isPrivate;
        const workspace_id = workspaceId;

        // Create the channel
        const { data, error: channelError } = await supabase
        .from('Channels')
        .insert([{ name, is_private, workspace_id }])
        .select('id');

        if (channelError || !data) {
            return NextResponse.json({ error: channelError?.message }, { status: 400 });
        }

        const channelId = data[0].id;

        // Update the workspace's channels array
        const { error: updateError } = await supabase
        .from('Workspaces')
        .update({
            channels: supabase.sql`array_append(channels, ${channelId})`
        })
        .eq('id', workspace_id);

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 400 });
        }

        return NextResponse.json({ id: channelId }, { status: 201 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {

    interface WorkspaceData {
        id?: number;
        name: string;
        description: string;
        iconSrc: string;
        members: number[];
        channels: number[];
    }

    try{
        const supabase = await createClient();
        const workspaceData = await request.json();
        const { name, description, iconSrc, members, channels } = workspaceData;
        
        const owner_id= 1
        const icon= iconSrc
      

        const { data , error } = await supabase
        .from('Workspaces')
        .insert([{ name, owner_id, description, icon, members, channels }]) 
        .select() as unknown as { data: WorkspaceData[] | null; error: any };


        if (error || !data || data.length === 0) {
            console.error('Insert failed:', error);
            return;
        }

        const insertedWorkspace = data[0];
        const workspaceId = insertedWorkspace.id;
        

        return NextResponse.json({id: workspaceId}, { status: 201 })

    } catch (error) {
        console.error("Error creating workspace:", error);
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
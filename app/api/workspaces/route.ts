import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {

    try{
        const supabase = await createClient();
        
        const { data: workspaces, error } = await supabase
        .from('Workspaces')
        .select('*')
        .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ workspaces });

    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
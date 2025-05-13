import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(  req: Request,
  { params }: { params: { channelId: string } }
) {
    try{
        const { channelId } = params

        const supabase = await createClient();


        const { data: channel, error } = await supabase
        .from('Channels')
        .select('*')
        .eq('id', channelId)
        .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        return NextResponse.json({ channel }, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
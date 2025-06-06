import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from 'next/server'


export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
        const { workspaceId } = params

        const supabase = await createClient();
        
        const { data: channels, error } = await supabase
        .from('Channels')
        .select('*')
        .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ channels }, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
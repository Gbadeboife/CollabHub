import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try{
        const supabase = await createClient();
        const taskData = await request.json();
        const { title, category, description, assignees, date, priority } = taskData;
        

        const { data, error } = await supabase
        .from('Tasks')
        .insert([{title, category, description, assignees, date, priority }]) 

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json(null, { status: 201 })

    } catch (error) {
        console.error("Error creating workspace:", error);
        return new NextResponse("Internal Server Error", {
            status: 500,
        })
    }

}
import { updateTask } from "@/data-models/task-data-service";
import { getServerSession } from "next-auth";

export async function POST(request: Request, {params}: {params: {id: string}}) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return new Response('Unauthorized', { status: 401 });
    }
    const task = await request.json();
    delete task['_id'];
    console.log(`update for ${session.user.email}, ${params.id}`, task);
    const res = await updateTask(params.id, session.user.email ?? '', {
        ...task,
        owner_id: session.user.email,
    });
    return Response.json(res as any);
}
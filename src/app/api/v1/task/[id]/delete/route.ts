import { deleteTask } from "@/data-services/task-data-service";
import { getServerSession } from "next-auth";

export async function POST(request: Request, {params}: {params: {id: string}}) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return new Response('Unauthorized', { status: 401 });
    }
    console.log(`delete for ${session.user.email}, ${params.id}`);

    const res = await deleteTask(params.id, session.user.email ?? '');
    return Response.json(res as any);
}
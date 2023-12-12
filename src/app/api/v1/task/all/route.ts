import { getAllTasks } from "@/data-models/task-data-service";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    const res = await getAllTasks(session.user.email ?? '');
    // const res = await getAllTasks('test-owner');
    return Response.json(res as any);
}
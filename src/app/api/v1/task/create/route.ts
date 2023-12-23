// const res = await createTask({
    //     title: 'Test2',
    //     description: 'Test Description 2',
    //     owner_id : 'test-owner',
    //     status: 'OPEN',
    // });

import { createTask } from "@/data-services/task-data-service";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return new Response('Unauthorized', { status: 401 });
    }
    const task = await request.json()
    console.log(`create for ${session.user.email}`, task);
    const res = await createTask({
        ...task,
        owner_id: session.user.email,
    });
    return Response.json(res as any);
}
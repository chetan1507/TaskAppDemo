"use client";

import { FilterView } from "@/components/filter-view";
import { DropdownInput } from "@/components/dropdown-input";
import { LeftNav } from "@/components/left-nav";
import { Modal } from "@/components/modal";
import { TaskForm } from "@/components/task-form";
import { Task, TaskStatus } from "@/data-models/task-data-service/types";
import * as TaskService from "@/services/api/task-service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DeleteConfirmModal } from "../../components/delete-modal";
import { ErrorBanner } from "../../components/error-banner";
import { set } from "lodash";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [error, setError] = useState<string>('');
  const [currentTask, setCurrentTask] = useState<Task>(null as any);
  const [filter, setFilter] = useState<string>('');

  const confirmDelete = () => {
    TaskService.remove(currentTask['_id']).then(
      (task: Task) => {
        console.log("deleted task", task);
        setTasks(tasks.filter((t) => t['_id'] !== task['_id']));
        setCurrentTask(null as any);
        setShowDeleteModal(false);
      },
      (error: any) => {
        setError(error.message);
        setShowDeleteModal(false);
      }
    );
  }

  const handleDelete = (task: Task) => {
    setCurrentTask(task);
    setShowDeleteModal(true);
  }

  if (!session?.data?.user || session.status !== 'authenticated') {
    redirect('/');
  }

  // on mount
  useEffect(() => {
    TaskService.fetchAll().then(
      (tasks: Task[]) => {
        setTasks(tasks);
      },
      (error: any) => {
        setError(error.message);
      }
    );
  }, []);

  // on error
  useEffect(() => {
    if (error) {
      // show error
      // alert(error);
    }
  }, [error]);

  // on confirmation
  useEffect(() => {
    if (currentTask) {
      // show confirmation
      // alert(currentTask);
    }
  }, [currentTask]);

  return (
    <section className="container mx-auto flex flex-row w-1/2 h-screen p-4 bg-white my-4 rounded shadow">
      <LeftNav user={session?.data?.user}></LeftNav>
      <div className="flex flex-col grow">

        {error.length >0 && <ErrorBanner error={error} onClose={() => setError('')}></ErrorBanner>}

        <div className="px-4 flex flex-row">
          <div className="justify-self-start"><FilterView filter={filter} setFilter={setFilter}></FilterView></div>

          <button
            className="mx-2 px-4 py-2 text-md font-semibold rounded bg-violet-600 text-gray-50 justify-self-end"
            onClick={() => {
              setCurrentTask(null as any);
              setShowFormModal(!showFormModal);
            }}
          >
            Add Task
          </button>
        </div>
        <div className="p-4  min-h-max" >
          <div className="">
            <table className="min-w-full divide-y-2 divide-gray-300 bg-gray-100 text-sm rounded">
              <thead className="ltr:text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Created
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {tasks.filter(task => {
                  if (filter === '') {
                    return true;
                  }
                  return task.status === filter;
                }).map((task) => {
                  return (
                    <tr key={task['_id']}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {task.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {new Date(task.created).toLocaleDateString('en-US',{year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <DropdownInput value={task.status} onChange={(status: string) => {
                            if (status !== task.status && status !== '') {
                              TaskService.update(task['_id'], {
                                title: task.title,
                                description: task.description,
                                status: status
                              }).then(
                                (task: Task) => {
                                  setTasks(
                                    tasks.map((t) => {
                                      if (t['_id'] === task['_id']) {
                                        return task;
                                      }
                                      return t;
                                    })
                                  );
                                },
                                (error: any) => {
                                  setError(error.message);
                                }
                              );
                            }
                        }} options={Object.keys(TaskStatus)} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                          <button
                            className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                            title="Edit Task"
                            onClick={() => {
                              console.log("edit task", task);
                              setCurrentTask(task);
                              setShowFormModal(!showFormModal);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>

                          <button
                            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                            title="Delete Task"
                            onClick={() => {
                              handleDelete(task);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {showFormModal &&
          Modal({
            content: TaskForm,
            contentProps: {
              task: currentTask,
              onSubmit: (formData: any) => {
                if (currentTask) {
                  TaskService.update(currentTask['_id'], formData).then(
                    (task: Task) => {
                      setTasks(
                        tasks.map((t) => {
                          if (t['_id'] === task['_id']) {
                            return task;
                          }
                          return t;
                        })
                      );
                      setShowFormModal(false);
                      setCurrentTask(null as any);
                    },
                    (error: any) => {
                      setShowFormModal(false);
                      setError(error.message);
                    }
                  );
                } else {
                  TaskService.create(formData).then(
                    (task: Task) => {
                      setTasks([...tasks, task]);
                      setShowFormModal(false);
                      setCurrentTask(null as any);
                    },
                    (error: any) => {
                      setShowFormModal(false);
                      setError(error.message);
                    }
                  );
                }
              },
              onClose: () => {
                setShowFormModal(false);
              }
            },
          })
        }
        {showDeleteModal &&
          <DeleteConfirmModal onClose={() => setShowDeleteModal(false)} confirmDelete={confirmDelete} />
        }
      </div>
    </section>
  );
}

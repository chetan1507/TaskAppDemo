import React, { useState } from "react";
import _ from 'lodash';
import { DropdownInput } from "./dropdown-input";
import { TaskStatus } from "../data-services/task-data-service/types";

export const TaskForm = ({
  task,
  onSubmit,
  onClose,
}: any) => {

  const [formData, setFormData] = useState(_.pick(task  ?? {
    title: '',
    description: '',
    status: 'OPEN',
  }, ['title', 'description', 'status']));

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log("submitting form", formData);
    onSubmit(formData);
  }

  return (

    <section className="container p-6 text-gray-800">
      <form
        noValidate
        className="w-full max-w-xl p-8 mx-auto space-y-6 rounded-md bg-gray-50"
        onSubmit={handleSubmit}
      >
        <h2 className="w-full text-xl font-bold leadi">Task</h2>
        <div>
          <label htmlFor="name" className="block mb-1 ml-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            required
            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ri focus:ri bg-gray-100"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 ml-1">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Description..."
            className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ri focus:ri bg-gray-100"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="status" className="block mb-1 ml-1">
            Status
          </label>
          <DropdownInput
            options={Object.keys(TaskStatus)}
            value={formData.status}
            onChange={(value: string) => {
              setFormData((prevData: any) => ({ ...prevData, status: value }));
            }}
          />
        </div>
        <div className="flex flex-row justify-center">

          <button onClick={onClose} className="px-6 py-2 mx-2 border-gray-800 border rounded-md">Cancel</button>
          <button type="submit" className="px-6 py-2 mx-2 shadow-sm border border-violet-600 rounded-md bg-violet-600 text-gray-50">
            {!!task ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </section>
  );
};

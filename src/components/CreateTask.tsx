import { useState } from "react";
import { useCreateTask } from "../hooks/tasks/useCreateTask";
import { toast } from "sonner";

export const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("click");

    if (!title.trim() || !description) {
      toast.error("all fill is required"); // ✅ tell the user why
      return;
    }

    setErrorMessage("");

    createTask.mutate(
      { title, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          toast.success("Task Created");
        },
        onError: (error: any) => {
          // ✅ add this
          toast.error(
            error?.response?.data?.message || "Failed to create task",
          );
        },
      },
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Task</h2>
      {/* ✅ Add this below the button */}
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTask.isPending}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTask.isPending}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={createTask.isPending}
          className="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {createTask.isPending ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

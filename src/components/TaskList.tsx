import { useDeleteTask } from "../hooks/tasks/useDeleteTask";
import { getTasksApi } from "../api/tasks/tasksApi";
import { useQuery } from "@tanstack/react-query";
import { useUpdateTask } from "../hooks/tasks/useUpdateTask";
import { useState } from "react";

export const TaskList = () => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  //get task
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryFn: getTasksApi,
    queryKey: ["tasks"],
  });

  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const handleToggleComplete = (taskId: string, currentStatus: boolean) => {
    updateTask.mutate({
      taskId,
      data: { isCompleted: !currentStatus },
    });
  };

  // Start editing - populate form with current data
  const handleEditClick = (task: any) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // Cancel editing - reset state
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = (taskId: string, currentStatus: boolean) => {
    updateTask.mutate(
      {
        taskId,
        data: {
          title: editTitle,
          description: editDescription,
          isCompleted: currentStatus,
        },
      },
      {
        onSuccess: () => {
          setEditingTaskId(null);
          setEditTitle("");
          setEditDescription("");
        },
      },
    );
  };
  if (isLoading) {
    return <p className="text-gray-600">Loading tasks...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600">
        {error instanceof Error ? error.message : "Failed to Load Tasks"}
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">All Tasks</h2>
      {tasks?.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create one!</p>
      ) : (
        <div className="space-y-4">
          {tasks?.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow relative"
            >
              {editingTaskId === task._id ? (
                ""
              ) : (
                <button
                  onClick={() => deleteTask.mutate(task._id)}
                  disabled={deleteTask.isPending}
                  className="absolute top-4 right-4 p-2 rounded-lg text-red-400 hover:text-red-600 bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🗑️
                </button>
              )}

              {/* Checkbox */}
              <div className="flex items-start gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() =>
                    handleToggleComplete(task._id, task.isCompleted)
                  }
                  disabled={updateTask.isPending || editingTaskId === task._id}
                  placeholder="checkbox"
                  className="mt-1 h-5 w-5 text-emerald-500 rounded focus:ring-emerald-500 cursor-pointer disabled:cursor-not-allowed"
                />

                {/* Display or Edit Mode */}
                <div className="flex-1">
                  {editingTaskId === task._id ? (
                    // EDIT MODE
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Task title"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        placeholder="Description (optional)"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleSaveEdit(task._id, task.isCompleted)
                          }
                          disabled={updateTask.isPending || !editTitle.trim()}
                          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={updateTask.isPending}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300  disabled:cursor-not-allowed transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // DISPLAY MODE
                    <div>
                      <h3
                        className={`font-medium ${
                          task.isCompleted
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p
                          className={`text-sm mt-1 ${
                            task.isCompleted ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-xs text-gray-400">
                          {task.isCompleted ? "✅ Completed" : "⏳ Pending"}
                        </p>
                        <button
                          onClick={() => handleEditClick(task)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

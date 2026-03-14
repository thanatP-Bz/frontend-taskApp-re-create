import { CreateTask } from "../../components/CreateTask";
import { Navbar } from "../../components/Navbar";
import { TaskList } from "../../components/TaskList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Full Width */}
      <Navbar />

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
            <p className="text-gray-600">Manage your daily tasks efficiently</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Create Task Form */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-8">
              <CreateTask />
            </div>

            {/* Right Column - Task List */}
            <div>
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

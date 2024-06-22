import React, { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import axios from "axios";

interface Task {
  taskRef: string;
  name: string;
  shortName: string;
  progress: string;
  point: number;
  assigneeName: string;
}

interface Project {
  projectRef: string;
  name: string;
  tasks: Task[];
}

interface DraggableListProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
  projects,
  updateProjects,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [sourceProject, setSourceProject] = useState<Project | null>(null);
  const [destinationProject, setDestinationProject] = useState<Project | null>(
    null
  );
  const dragControl = useDragControls();

  const handleDragEnd = async (confirmed: boolean) => {
    if (confirmed && draggedTask && sourceProject && destinationProject) {
      try {
        await axios.post("http://localhost:8080/api/updateTask", {
          task: draggedTask,
          fromProject: sourceProject.projectRef,
          toProject: destinationProject.projectRef,
        });

        const updatedProjects = projects.map((project) => {
          if (project.projectRef === sourceProject.projectRef) {
            return {
              ...project,
              tasks: project.tasks.filter(
                (task) => task.taskRef !== draggedTask.taskRef
              ),
            };
          } else if (project.projectRef === destinationProject.projectRef) {
            return {
              ...project,
              tasks: [...project.tasks, draggedTask],
            };
          }
          return project;
        });

        updateProjects(updatedProjects);
      } catch (error) {
        console.error("Failed to update task", error);
      }
    }
    setShowModal(false);
    setDraggedTask(null);
    setSourceProject(null);
    setDestinationProject(null);
  };

  return (
    <div className="">
      {projects.map((project) => (
        <div key={project.projectRef} className="mb-3">
          <h3 className="mb-2 text-lg font-bold">{project.name}</h3>
          <Reorder.Group
            axis="y"
            values={project.tasks}
            onReorder={(newOrder) => {
              updateProjects(
                projects.map((p) =>
                  p.projectRef === project.projectRef
                    ? { ...project, tasks: newOrder }
                    : p
                )
              );
            }}
          >
            {project.tasks.map((task) => (
              <Reorder.Item
                key={task.taskRef}
                value={task}
                dragListener={false}
                dragControls={dragControl}
                onDragEnd={() => {
                  setDraggedTask(task);
                  setSourceProject(project);
                  setDestinationProject(project); // For same project drag-and-drop
                  setShowModal(true);
                }}
              >
                <div
                  onPointerDown={(event) => dragControl.start(event)}
                  className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                >
                  {task.name}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-4 bg-white rounded-md shadow-lg">
            <p>Do you want to confirm the changes?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDragEnd(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDragEnd(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableList;

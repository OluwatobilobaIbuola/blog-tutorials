import React, { useState } from 'react';
import DraggableList from './DraggableList';

const initialProjects = [
  {
    projectRef: 'project1',
    name: 'Project 1',
    tasks: [
      { taskRef: 'task1', name: 'Task 1', shortName: 'T1', progress: 'In Progress', point: 3, assigneeName: 'John' },
      { taskRef: 'task2', name: 'Task 2', shortName: 'T2', progress: 'Completed', point: 5, assigneeName: 'Doe' },
    ],
  },
  {
    projectRef: 'project2',
    name: 'Project 2',
    tasks: [
      { taskRef: 'task3', name: 'Task 3', shortName: 'T3', progress: 'Pending', point: 2, assigneeName: 'Jane' },
      { taskRef: 'task4', name: 'Task 4', shortName: 'T4', progress: 'In Progress', point: 4, assigneeName: 'Smith' },
    ],
  },
];

const Drag: React.FC = () => {
  const [projects, setProjects] = useState(initialProjects);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Drag and Drop Project Tasks</h1>
      <DraggableList projects={projects} updateProjects={setProjects} />
    </div>
  );
};

export default Drag;

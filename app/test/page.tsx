"use client";

import { useState, useEffect } from "react";
import {
  createCase,
  getCases,
  getTasks,
  updateCase,
  updateTask,
} from "./actions/caseActions";
import { Button } from "@/components/ui/button";
import { Case, Task } from "@/utils/singleStore";
// import { Checkbox } from "@/components/ui/checkbox";

export const fetchUserData = async () => {
  const casesResult = await getCases();
  if (!casesResult.success) {
    console.log(casesResult.error);
    return { cases: [] };
  }

  // Fetch tasks for each case
      const tasksPromises =
        casesResult.cases?.map(async (caseItem) => {
          const tasksResult = await getTasks(caseItem.id);
          return {
            caseId: caseItem.id,
            tasks: tasksResult.success ? tasksResult.tasks : [],
          };
        }) ?? [];

      const tasksResults = await Promise.all(tasksPromises);
      const tasksMap = tasksResults.reduce<{ [caseId: number]: Task[] }>(
        (acc, { caseId, tasks }) => {
          if (tasks) {
            acc[caseId] = tasks;
          }
          return acc;
        },
        {}
      );

    return { casesResult, tasksMap };
};

export default function Page() {
  const [message, setMessage] = useState("");
  const [cases, setCases] = useState<Case[]>([]);
  const [caseTasks, setCaseTasks] = useState<{ [caseId: number]: Task[] }>({});
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  useEffect(() => {
    fetchCasesAndTasks();
  }, []);

  const fetchCasesAndTasks = async () => {
    const { cases, tasksMap } = await fetchUserData();
    setCases(cases ?? []);
    setCaseTasks(tasksMap ?? {});
  };

  const handleTaskChange = async (task: Task, completed: boolean) => {
    const updatedTask = { ...task, completed };
    const result = await updateTask(updatedTask);
    if (result.success) {
      fetchCasesAndTasks();
    } else {
      setMessage(result.error || "Error updating task. Please try again.");
    }
  };

  const handleEditCase = (caseItem: Case) => {
    setEditingCase(caseItem);
  };

  const handleUpdateCase = async () => {
    if (editingCase) {
      const result = await updateCase(editingCase);
      if (result.success) {
        setMessage("Case updated successfully!");
        setEditingCase(null);
        fetchCasesAndTasks();
      } else {
        setMessage(result.error || "Error updating case. Please try again.");
      }
    }
  };

  const handleCreateNewCase = async () => {
    const newCase = {
      name: "John Doe",
      age: 20,
      gender: "Male",
      location: "New York, NY",
      profile_description: "This is a sample case created from the test page.",
      image_link: "https://example.com/sample-image.jpg",
      donation_amount: 0,
      tasks: [
        {
          id: Math.floor(Math.random() * 1000000),
          case_id: 0, // This will be updated when the case is created
          name: "Initial Assessment",
          description: "Conduct an initial assessment of John Doe's situation.",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Math.floor(Math.random() * 1000000),
          case_id: 0, // This will be updated when the case is created
          name: "Create Support Plan",
          description: "Develop a comprehensive support plan for John Doe.",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Math.floor(Math.random() * 1000000),
          case_id: 0, // This will be updated when the case is created
          name: "Follow-up Meeting",
          description:
            "Schedule and conduct a follow-up meeting with John Doe.",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    const result = await createCase(newCase);

    if (result.success) {
      setMessage(`New case created successfully! Case ID: ${result.caseId}`);
      fetchCasesAndTasks(); // Refresh the list after creating a new case
    } else {
      setMessage(result.error || "Error creating new case. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Button onClick={handleCreateNewCase}>Create New Case</Button>
      {message && <p>{message}</p>}

      <h2>Cases List</h2>
      <ul>
        {cases.map((caseItem) => (
          <li key={caseItem.id}>
            {editingCase?.id === caseItem.id ? (
              <div>
                <input
                  value={editingCase.name}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, name: e.target.value })
                  }
                />
                <input
                  value={editingCase.age}
                  onChange={(e) =>
                    setEditingCase({
                      ...editingCase,
                      age: parseInt(e.target.value),
                    })
                  }
                />
                <input
                  value={editingCase.location}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, location: e.target.value })
                  }
                />
                <textarea
                  value={editingCase.profile_description}
                  onChange={(e) =>
                    setEditingCase({
                      ...editingCase,
                      profile_description: e.target.value,
                    })
                  }
                />
                <Button onClick={handleUpdateCase}>Save</Button>
                <Button onClick={() => setEditingCase(null)}>Cancel</Button>
              </div>
            ) : (
              <div>
                <p>
                  {caseItem.name} - {caseItem.age} years old -{" "}
                  {caseItem.location}
                </p>
                <p>Description: {caseItem.profile_description}</p>
                <Button onClick={() => handleEditCase(caseItem)}>Edit</Button>
              </div>
            )}
            <ul>
              {caseTasks[caseItem.id]?.map((task) => (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => handleTaskChange(task, e.target.checked)}
                  />
                  {task.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

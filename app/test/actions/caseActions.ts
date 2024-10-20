"use server";

import { caseTable, taskTable, Case, ai } from "@/utils/singleStore";
import crypto from "crypto";
import { Task } from "@/utils/singleStore";

export async function createCase(newCase: {
  name: string;
  age: number;
  gender: string;
  location: string;
  profile_description: string;
  image_link: string;
  donation_amount: number;
  tasks?: Task[];
}): Promise<{ success: boolean; caseId?: string; error?: string }> {
  try {
    if (!caseTable || !taskTable) {
      throw new Error("Case or task table is not initialized.");
    }

    // Insert the new case
    const [caseResults] = await caseTable.insert([
      {
        name: newCase.name,
        age: newCase.age ?? 0,
        gender: newCase.gender ?? "",
        location: newCase.location ?? "",
        profile_description: newCase.profile_description ?? "",
        image_link: newCase.image_link ?? "",
        donation_amount: 0,
      },
    ]);

    // Assuming caseResult has an 'insertId' property
    const caseIdNumber = caseResults[0].insertId;

    if (isNaN(caseIdNumber)) {
      throw new Error("Failed to retrieve a valid case ID.");
    }

    // Insert tasks if provided
    if (newCase.tasks && newCase.tasks.length > 0) {
      const tasksToInsert = newCase.tasks.map((task) => ({
        id: Math.floor(Math.random() * 1000000),
        case_id: caseIdNumber, // Use the numeric caseId
        name: task.name,
        description: task.description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      try {
        await taskTable.insert(tasksToInsert);
      } catch (error) {
        console.error("Error inserting tasks:", error);
        throw error;
      }
    }

    return { success: true, caseId: caseIdNumber.toString() };
  } catch (error) {
    console.error("Error creating new case:", error);
    return {
      success: false,
      error: "Error creating new case. Please try again.",
    };
  }
}

export async function getCases(
  limit: number = 10,
  offset: number = 0,
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Promise<{ success: boolean; cases?: any[]; error?: string }> {
  try {
    if (!caseTable) {
      throw new Error("Case table is not initialized.");
    }

    const cases = await caseTable.find({
      select: ["*"],
      orderBy: { [sortBy]: sortOrder },
      limit: limit,
      offset: offset,
    });

    return { success: true, cases };
  } catch (error) {
    console.error("Error fetching cases:", error);
    return {
      success: false,
      error: "Error fetching cases. Please try again.",
    };
  }
}

export async function getTasks(
  caseId: number
): Promise<{ success: boolean; tasks?: any[]; error?: string }> {
  try {
    if (!taskTable) {
      throw new Error("Task table is not initialized.");
    }

    const tasks = await taskTable.find({
      where: { case_id: caseId } as any,
      select: ["*"],
    });

    return { success: true, tasks };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      success: false,
      error: "Error fetching tasks. Please try again.",
    };
  }
}

export async function getCaseAndTasks(
  caseId: number
): Promise<{ success: boolean; case?: any; tasks?: any[]; error?: string }> {
  try {
    if (!caseTable || !taskTable) {
      throw new Error("Case or task table is not initialized.");
    }

    const [caseData] = await caseTable.find({
      where: { id: caseId },
      select: ["*"],
    });

    if (!caseData) {
      throw new Error("Case not found.");
    }

    const tasks = await taskTable.find({
      where: { case_id: caseId } as any,
      select: ["*"],
    });

    return { success: true, case: caseData, tasks };
  } catch (error) {
    console.error("Error fetching case and tasks:", error);
    return {
      success: false,
      error: "Error fetching case and tasks. Please try again.",
    };
  }
}

export async function updateCase(
  updatedCase: Case
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!caseTable) {
      throw new Error("Case table is not initialized.");
    }

    const updateData: any = {
      name: updatedCase.name,
      age: updatedCase.age,
      gender: updatedCase.gender,
      location: updatedCase.location,
      image_link: updatedCase.image_link,
      donation_amount: updatedCase.donation_amount,
    };

    // If profile_description is updated, generate AI embeddings
    if (updatedCase.profile_description) {
      const description_v = (
        await ai.embeddings.create(updatedCase.profile_description)
      )[0];
      updateData.profile_description = updatedCase.profile_description;
      updateData.embedding = JSON.stringify(description_v);
    }

    await caseTable.update(updateData, { id: updatedCase.id });

    return { success: true };
  } catch (error) {
    console.error("Error updating case:", error);
    return {
      success: false,
      error: "Error updating case. Please try again.",
    };
  }
}

export async function updateTask(
  updatedTask: Task
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!taskTable) {
      throw new Error("Task table is not initialized.");
    }

    const updateData: any = {
      name: updatedTask.name,
      completed: updatedTask.completed,
      updatedAt: new Date(),
    };

    // If description is updated, generate AI embeddings
    if (updatedTask.description) {
      const description_v = (
        await ai.embeddings.create(updatedTask.description)
      )[0];
      updateData.description = updatedTask.description;
      updateData.description_v = JSON.stringify(description_v);
    }

    await taskTable.update(updateData, { id: updatedTask.id });

    return { success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      success: false,
      error: "Error updating task. Please try again.",
    };
  }
}

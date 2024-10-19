"use server";

import { caseTable, taskTable } from "@/utils/singleStore";
import crypto from "crypto";

export async function createCase(newCase: {
  name: string;
  age: number;
  gender: string;
  location: string;
  profile_description: string;
  image_link: string;
  donation_amount: number;
  tasks?: { name: string; description: string }[];
}): Promise<{ success: boolean; caseId?: string; error?: string }> {
  try {
    if (!caseTable || !taskTable) {
      throw new Error("Case or task table is not initialized.");
    }

    // Insert the new case
    const [caseResults] = await caseTable.insert([
      {
        name: newCase.name,
        age: newCase.age,
        gender: newCase.gender,
        location: newCase.location,
        profile_description: newCase.profile_description,
        image_link: newCase.image_link,
        donation_amount: newCase.donation_amount,
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

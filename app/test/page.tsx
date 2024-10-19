"use client";

import { useState } from "react";
import { createCase } from "./actions/caseActions";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [message, setMessage] = useState("");

  const handleCreateNewCase = async () => {
    const newCase = {
      name: "John Doe",
      age: 30,
      gender: "Male",
      location: "New York, NY",
      profile_description: "This is a sample case created from the test page.",
      image_link: "https://example.com/sample-image.jpg",
      donation_amount: 0,
      tasks: [
        {
          name: "Initial Assessment",
          description: "Conduct an initial assessment of John Doe's situation.",
          completed: false,
        },
        {
          name: "Create Support Plan",
          description: "Develop a comprehensive support plan for John Doe.",
          completed: false,
        },
        {
          name: "Follow-up Meeting",
          description:
            "Schedule and conduct a follow-up meeting with John Doe.",
          completed: false,
        },
      ],
    };

    const result = await createCase(newCase);

    if (result.success) {
      setMessage(`New case created successfully! Case ID: ${result.caseId}`);
    } else {
      setMessage(result.error || "Error creating new case. Please try again.");
    }
  };

  return (
    <div>
      <Button onClick={handleCreateNewCase}>Create New Case</Button>
      {message && <p>{message}</p>}
    </div>
  );
}

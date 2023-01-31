"use client";
import Register from "@/components/Register";
import EmailVerification from "@/components/EmailVerification";
import { useState, useEffect } from "react";

export default function Home() {
  const [showActivation, setShowActivation] = useState(false);

  useEffect(() => {
    const hasVerified = localStorage.getItem("verificationCompleted");
    const activationStatusInLocaltorage = localStorage.getItem(
      "verificationPending"
    );
    if (hasVerified) {
      // remove both "verificationCompleted" and "verificationPending"
      localStorage.removeItem("verificationPending");
      localStorage.removeItem("verificationCompleted");
    } else if (activationStatusInLocaltorage) {
      setShowActivation(true);
    }
  }, [showActivation]);
  return (
    <main className="lg:pr-[6rem]">
      {showActivation ? (
        <EmailVerification />
      ) : (
        <Register setActivation={setShowActivation} />
      )}
    </main>
  );
}

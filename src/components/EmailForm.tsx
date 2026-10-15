"use client";

import { useId, useState, type FormEvent } from "react";

interface EmailFormProps {
  labels: {
    emailLabel: string;
    placeholder: string;
    button: string;
    sending: string;
    successMessage: string;
    alreadyOnList: string;
    error: string;
  };
}

type Status = "idle" | "loading" | "success" | "error";

export default function EmailForm({ labels }: EmailFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 409) {
        setStatus("success");
        setMessage(labels.alreadyOnList);
        return;
      }

      if (!response.ok) {
        throw new Error(labels.error);
      }

      setStatus("success");
      setMessage(labels.successMessage);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(labels.error);
    }
  };

  if (status === "success") {
    return <p className="form-status form-status-success" role="status">{message}</p>;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={inputId}>{labels.emailLabel}</label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={labels.placeholder}
          autoComplete="email"
          required
          disabled={status === "loading"}
        />
      </div>
      <button type="submit" className="form-submit" disabled={status === "loading"}>
        {status === "loading" ? labels.sending : labels.button}
      </button>
      {status === "error" && <p className="form-status form-status-error" role="alert">{message}</p>}
    </form>
  );
}

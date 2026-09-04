"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} style={{ marginTop: "1rem" }}>
      Print Ticket
    </button>
  );
}
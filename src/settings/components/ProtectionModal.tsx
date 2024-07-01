import * as React from "react";
import { useSyncing } from "../hooks/useSyncing";

export function ProtectionModal({ onSuccess }: { onSuccess: () => void }) {
  const [loaded, protectionType] = useSyncing<string>("protectionType");
  if (!loaded) {
    return null;
  } else if (protectionType === "none") {
    onSuccess();
  }

  switch (protectionType) {
    default:
    case "none":
      return null;
    case "button":
      return <button onClick={onSuccess}>Log In</button>;
  }
}

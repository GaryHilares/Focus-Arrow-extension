import * as React from "react";
import { useSyncing } from "../hooks/useSyncing";

export function ProtectionModal({ onSuccess }: { onSuccess: () => void }) {
  const [loaded, protectionType] = useSyncing<string>("protectionType");
  if (!loaded) {
    return null;
  } else if (protectionType === "none") {
    onSuccess();
    return null;
  }

  return (
    <>
      {protectionType == "button" && (
        <button onClick={onSuccess}>Log In</button>
      )}
    </>
  );
}

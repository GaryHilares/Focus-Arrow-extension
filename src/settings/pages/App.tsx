import * as React from "react";
import { useState } from "react";
import { ProtectionModal } from "../components/ProtectionModal";
import { EntryEditor } from "../components/EntryEditor";
import { SettingsEditor } from "../components/SettingsEditor";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return loggedIn ? (
    <>
      <EntryEditor />
      <SettingsEditor />
    </>
  ) : (
    <ProtectionModal onSuccess={() => setLoggedIn(true)} />
  );
}

export default App;

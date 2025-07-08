import * as React from "react";
import { useState } from "react";
import { ProtectionModal } from "../components/protection/ProtectionModal";
import { EntryEditor } from "../components/entries/EntryEditor";
import { SettingsEditor } from "../components/settings/SettingsEditor";
import * as styles from "./App.module.scss";

enum Tab {
  EntryEditor,
  SettingsEditor,
}

function TabMapper({ tab }: { tab: Tab }) {
  switch (tab) {
    case Tab.EntryEditor:
      return <EntryEditor />;
    case Tab.SettingsEditor:
      return <SettingsEditor />;
  }
}

function TabNavigation({ setTab }: { setTab: (tab: Tab) => void }) {
  return (
    <header className={styles.header}>
      <div>
        <img
          src="/common/icons/Liberty_Arrow_text-false.png"
          width="40px"
          height="40px"
        />
        <h1>Liberty Arrow</h1>
      </div>
      <nav>
        <ul>
          <li>
            <button onClick={() => setTab(Tab.EntryEditor)}>Entries</button>
          </li>
          <li>
            <button onClick={() => setTab(Tab.SettingsEditor)}>Settings</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>(Tab.EntryEditor);

  return loggedIn ? (
    <>
      <TabNavigation setTab={setTab} />
      <div className={styles["main-content"]}>
        <TabMapper tab={tab} />
      </div>
    </>
  ) : (
    <ProtectionModal onSuccess={() => setLoggedIn(true)} />
  );
}

export default App;

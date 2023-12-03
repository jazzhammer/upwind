'use client'
import {useState} from "react";
import Menu from "/app/menu/menu";
import ClientMode from "/app/client/client-mode";

export default function Home() {
  const [mode, setMode] = useState();
  const onMenuItem = (next) => {
    setMode(next);
  }
  return (
    <main className="flex flex-col justify-between p-8">
      <div className="w-full font-mono text-xs h-4 bg-red">
          <Menu onMenuItem={onMenuItem}></Menu>
      </div>
      <div className={"w-full h-full"}>
        <ClientMode mode={mode}></ClientMode>
      </div>
    </main>
  )
}

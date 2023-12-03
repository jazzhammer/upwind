'use client'
import Doc from "/app/doc/doc.mdx";
import Devices from "/app/device/devices";

export default function ClientMode({mode}) {
  return (
    <div className={"h-full p-2"}>
      {mode && mode === 'doc' && <Doc></Doc>}
      {mode && mode === 'devices' && <Devices></Devices>}
    </div>
  );
}
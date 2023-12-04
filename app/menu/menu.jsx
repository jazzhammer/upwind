'use client'
import {useEffect, useState} from "react";

export default function Menu({onMenuItem}) {
  const [menuItem, setMenuItem] = useState('doc');
  useEffect(() => {
    onMenuItem(menuItem);
  }, [menuItem, onMenuItem]);
    return (
        <div className={"w-full flex flex-row h-5 border-b-2   border-white"}>
          <div className={"ml-5 mr-5 cursor-pointer hover:text-blue-300" + (menuItem==='doc' ? ' text-green-300' : "")} onClick={()=>{setMenuItem('doc')}}>doc</div>
          <div className={"ml-5 mr-5 cursor-pointer hover:text-blue-300" + (menuItem==='devices' ? ' text-green-300' : "")} onClick={()=>{setMenuItem('devices')}}>devices</div>
        </div>
    );
}
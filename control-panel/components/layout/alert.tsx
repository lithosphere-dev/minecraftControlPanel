"use client"

import { Cross2Icon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface AlertInfo {
  type: "default" | "warning" | "danger",
  title: string;
  description: string;
}

export const Alert = (props: AlertInfo) => {

  const [color, setColor] = useState("");

  useEffect(() => {
    switch (props.type) {
      case "warning":
        setColor("yellow-600");
        break;
      case "danger":
        setColor("red-600");
        break;
      default:
        setColor("blue-600");
        break;
    }
    console.log('Component mounted');

    return () => {
      console.log('Component unmounted');
    };
  }, []);


  return (
    <div className={`absolute rounded border-2 bottom-2 right-2 w-96 p-2 border border-${color} flex gap-2 items-center`}>
      <div>
        {props.type === "default" && <InfoCircledIcon width={25} height={25} />}
        {props.type === "warning" && <ExclamationTriangleIcon width={25} height={25} />}
        {props.type === "danger" && <CrossCircledIcon width={25} height={25} />}
      </div>
      <div>
        <h3 className={`text-lg font-semibold text-${color}`}>{props.title}</h3>
        <p className={`text-sm text-${color}`}>{props.description}</p>
      </div>
      <button className="absolute top-2 right-2">
        <Cross2Icon width={15} height={15} />
      </button>
    </div>
  )
}
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export const useEventContext = () => {
  const context = useContext(EventContext)

  return context
}
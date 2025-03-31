import { NodeData } from "../../utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NodeTypeSwitcher } from "./NodeTypeSwitcher";
import styles from "./NodeContainer.module.css";

type NodeContainerProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const NodeContainer = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isFocused ? 10 : 1,
    opacity: isFocused ? 1 : 0.5,
    cursor: isFocused ? "grab" : "pointer",
    backgroundColor: isFocused ? "lightblue" : "white",
    border: isFocused ? "2px solid blue" : "1px solid gray",
    borderRadius: "4px",
    padding: "10px",
    margin: "5px",
  };
  return<div {...attributes}
  ref={setNodeRef}
  style={style}
  className={styles.container}>
    <div {...listeners} className={styles.dragHandle}>
        ::
    </div>
    <NodeTypeSwitcher 
    node={node}
    updateFocusedIndex={updateFocusedIndex}
    isFocused={isFocused}
    index={index}
  
    />
  </div>
};

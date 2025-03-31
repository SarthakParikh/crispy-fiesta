import { NodeData, NodeType } from "../../utils/types";
import { BasicNode } from "./BasicNode";

type NodetypeSwitcherProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

const TEXT_NODE_TYPES: NodeType[] = [
  "text",
  "image",
  "list",
  "page",
  "page",
  "heading1",
  "heading2",
  "heading3",
];
export const NodeTypeSwitcher = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodetypeSwitcherProps) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return <BasicNode  node={node} index={index} isFocused={isFocused} updateFocusedIndex={updateFocusedIndex}/>
  }


  return null
};

import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from "react";
import { NodeData, NodeType } from "../../utils/types";
import styles from "./Node.module.css";
import { nanoid } from "nanoid";
import { useAppState } from "../../state/AppStateContext";
import { CommandPane } from "./CommandPane";
import cx from "classnames";

type bscsicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
 
};
export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,

}: bscsicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
    const { addNode, removeNodeByIndex, changeNodeValue,changeNodeType } = useAppState();
    const showCommandPalette = isFocused && node?.value?.match(/^\//);
  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const parseCommand = (nodeTyle:NodeType)=>{
    if (nodeRef.current) {
      changeNodeType(index,nodeTyle);
      nodeRef.current.textContent = "";
    }

  }

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === "Enter") {
      event.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, id: nanoid(), value: "" }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (event.key === "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
  {
    showCommandPalette && (
      <CommandPane selectItem={parseCommand}  nodeText={node.value}/>
    )
  }
    <div
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      contentEditable
      suppressContentEditableWarning
      ref={nodeRef}
      className={cx(styles.node, styles[node.type])}
    />
      </>
  );
};

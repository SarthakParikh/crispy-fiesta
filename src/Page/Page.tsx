import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Title } from "./Title";
import { BasicNode } from "../assets/Node/BasicNode";
import styles from "./Page.module.css";
import { Spcaer } from "./Spacer";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { NodeTypeSwitcher } from "../assets/Node/NodeTypeSwitcher";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NodeContainer } from "../assets/Node/NodeContainer";

export const Page = () => {
  const { title, nodes, addNode, setTitle, reorderNodes } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });
  const handleDragEvent=(event:DragEndEvent)=>{
    const { active, over } = event;
    if (over?.id && active?.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }

  }

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => {
              return (
                <NodeContainer
                  key={node.id}
                  node={node}
                  isFocused={focusedNodeIndex === index}
                  updateFocusedIndex={setFocusedNodeIndex}
                  index={index}
                />
              );
            })}
          </SortableContext>
          <DragOverlay />
        </DndContext>
        <Spcaer
          handleClick={() => {
            addNode({ type: "text", id: nanoid(), value: "" }, nodes.length);
            setFocusedNodeIndex(nodes.length);
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
};

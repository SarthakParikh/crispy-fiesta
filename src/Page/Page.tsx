import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Title } from "./Title";
import { BasicNode } from "../assets/Node/BasicNode";
import styles from "./Page.module.css";
import { Spcaer } from "./Spacer";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { NodeTypeSwitcher } from "../assets/Node/NodeTypeSwitcher";


export const Page = () => {
    const { title, nodes,addNode,setTitle } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });
    
  return<>
  <Cover />
  <div>
    <Title addNode={addNode} title={title} changePageTitle={setTitle} />
    {
        nodes.map((node, index) => {
            return (
                <NodeTypeSwitcher
                    key={node.id}
                    node={node}
                    isFocused={focusedNodeIndex === index}
                    updateFocusedIndex={setFocusedNodeIndex}
                    index={index}
                   


                    />
            )
        })
    }
    <Spcaer
    handleClick={() => {
        addNode({ type: "text", id: nanoid(), value: "" }, nodes.length);
        setFocusedNodeIndex(nodes.length);

    }}
    showHint={!nodes.length}/>
  </div>
  
  </>
};

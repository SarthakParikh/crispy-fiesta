import { NodeData, NodeType, Page } from "../utils/types";
import { useImmer } from "use-immer";
import { arrayMove } from "@dnd-kit/sortable";

export const usePageState = ( initialState:Page) => {
    const [page,setpage] = useImmer<Page>(initialState);
    const addNode = (node: NodeData, index: number) => {
        setpage((draft) => {
            draft.nodes.splice(index, 0, node);
        });
    }
    const removeNodeByIndex = (index: number) => {
        setpage((draft) => {
            draft.nodes.splice(index, 1);
        });
    };
    const changeNodeValue = (index: number, value: string) => {
        setpage((draft) => {
            draft.nodes[index].value = value;
        });
    };
    const changeNodeType = (index: number, type: NodeType) => {
        setpage((draft) => {
            draft.nodes[index].type = type;
            draft.nodes[index].value = "";
        });
    }
    const setNodes =(nodes:NodeData[]) => {
        setpage((draft) => {
            draft.nodes = nodes;
        });
    }   

    const setTitle = (title: string) => {
        setpage((draft) => {
            draft.title = title;
        });
    };
    const setCoverImage = (image: string) => {
        setpage((draft) => {
            draft.cover = image;
        });
    }

    const reorderNodes=(id1:String,id2:string)=>{
        setpage((draft) => {
            const index1 = draft.nodes.findIndex((node) => node.id === id1);
            const index2 = draft.nodes.findIndex((node) => node.id === id2);
            if (index1 !== -1 && index2 !== -1) {
                const nodes = arrayMove(draft.nodes, index1, index2);
                draft.nodes = nodes;
            }
        }); 

    }
return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeByIndex,
    setTitle,
    setCoverImage,
    setNodes,
    reorderNodes,}
     
}
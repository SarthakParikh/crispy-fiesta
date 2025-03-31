import { NodeData, NodeType, Page } from "../utils/types";
import { useImmer } from "use-immer";

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
    setNodes}
     
}
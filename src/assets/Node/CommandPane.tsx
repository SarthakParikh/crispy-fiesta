import { useEffect, useState } from "react";
import { NodeType } from "../../utils/types";
import { useOverflowScreenBottom } from "./useOverflowScreenBottom";
import styles from "./CommandPanel.module.css";
import cx from "classnames";
type CommmandPaneProps = {
    nodeText: string;
    selectItem: (nodeType: NodeType) => void;
}

type supportedNodeType = {
    type: NodeType;
    text: string;
}    

const supportedNodeTypes: supportedNodeType[] = [
    { type: "text", text: "Text" },
    { type: "image", text: "Image" },
    { type: "list", text: "List" },
    { type: "page", text: "Page" },
    { type: "heading1", text: "Heading 1" },
    { type: "heading2", text: "Heading 2" },
    { type: "heading3", text: "Heading 3" },
];

export const CommandPane = ({ nodeText, selectItem }: CommmandPaneProps) => {
    const [selectItemsIndex, setSelectItemsIndex] = useState(0);
    const { overflow,ref } = useOverflowScreenBottom();
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if(event.key ==='Enter'){
            event.preventDefault()
            selectItem(supportedNodeTypes[selectItemsIndex].type)
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }
    }
    ,[selectItemsIndex, selectItem])

    useEffect(() => {
        const normalizedValue = nodeText.toLowerCase().replace(/\//,"");
        setSelectItemsIndex( supportedNodeTypes.findIndex(item => item.type.match(normalizedValue)) )
    },[nodeText])


    return<div ref={ref } className={
        cx(styles.panel, {
            [styles.reverse]: overflow,
        })
    }>
<div className={styles.title}>
    Blocks</div>
    <ul >
        {supportedNodeTypes.map((item, index) => {
           const selected = selectItemsIndex === index;
           return(
            <li key={item.type} className={cx({
                [styles.selected]: selected,

            })} onClick={() => selectItem(item.type)}>
                {item.text}

            </li>
           )
})}
    </ul>


    </div>

}
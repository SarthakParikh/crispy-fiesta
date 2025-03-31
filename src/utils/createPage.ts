import { nanoid } from "nanoid";
import { Page } from "./types";

export const  createPage=()=>{
    const slug = nanoid()
    const id = nanoid()
    const Page:Page = {
      title:"untitled",
      id,
      slug,
      nodes: [
 
      ],
      cover: "",
    };
    return Page;
  }
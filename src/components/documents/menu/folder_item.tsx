import React, { useContext, useEffect, useRef } from "react";
import * as S from "../../menubar/styles";
import { Link } from "react-router-dom";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Menu } from "primereact/menu";
import { ReactComponent as ArrowUp } from "../../../assets/Sidebar/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../../assets/Sidebar/ArrowDown.svg";
import { ReactComponent as FolderIcon } from "../../../assets/Sidebar/FolderIcon.svg";
import { ReactComponent as Meatball } from "../../../assets/Sidebar/meatball_folder.svg";
import { ReactComponent as Remove } from "../../../assets/Sidebar/Remove.svg";
import { ReactComponent as Edit } from "../../../assets/Sidebar/Edit_Icon.svg";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { Cookies } from "react-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkModeState, showRenameState } from "../../../recoil/recoil";
import { ThemeContext } from "styled-components";

type Props = {
  depth: number;
  node: NodeModel<any>;
  toggles: (number | string)[];
  setToggles: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  isOpen: boolean;
  onToggle: () => void;
  toast: React.RefObject<Toast>;
  showDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  allNodes: NodeModel<any>[];
};

const FolderItem = ({
  depth,
  node,
  allNodes,
  toggles,
  setToggles,
  isOpen,
  onToggle,
  toast,
  setDeleteId,
  showDialog,
}: Props) => {
  const menuRef = useRef<Menu>(null);
  const deviderRef = useRef<HTMLDivElement>(null);

  const isDarkMode = useRecoilValue(isDarkModeState);
  const cookies = new Cookies();
  const theme = useContext(ThemeContext);
  const setShowRename = useSetRecoilState(showRenameState);

  useEffect(() => {
    {
      /* {(!toggles.includes(node.id) ||
        allNodes.filter((item) => item.parent === node.id).length === 0) && (
        
      )} */
    }
    console.log("is open!", isOpen);
    if (
      !toggles.includes(node.id) ||
      allNodes.filter((item) => item.parent === node.id).length === 0
    ) {
      deviderRef.current?.classList.add("isOpen");
    } else {
      deviderRef.current?.classList.remove("isOpen");
    }
  }, [isOpen]);

  const items: MenuItem[] = [
    {
      label: "Rename",
      icon: (
        <div style={{ paddingRight: 4 }}>
          <Edit fill={theme?.color.black} />
        </div>
      ),
      command: () => {
        cookies.set("renameId", node.data?.id);
        cookies.set("renameType", "folder");
        setShowRename(true);
      },
    },
    {
      label: "Remove",
      icon: (
        <div style={{ paddingRight: 4 }}>
          <Remove fill={theme?.color.black} />
        </div>
      ),
      command: async () => {
        console.log("=======document delete=======", node.data?.id);
        setDeleteId(`${node.data?.id}`);
        cookies.set("deleteId", node.data?.id);
        cookies.set("deleteType", "folder");
        showDialog(true);
      },
    },
  ];

  return (
    <>
      <S.FolderNodeWrapper
        parent={node.parent}
        depth={depth}
        className={`depth${depth}`}
        onClick={(e) => {
          if (toggles.includes(node.id)) {
            var copy = [...toggles];
            copy = copy.filter((n) => n !== node.id);
            setToggles(copy);
          } else {
            setToggles([...toggles, node.id]);
          }
          onToggle();
        }}
      >
        <S.FolderIconWrapper>
          <FolderIcon />
        </S.FolderIconWrapper>
        <S.FolderNodeText depth={depth}>{node.text}</S.FolderNodeText>
        <S.FolderHoveringButton
          className="hovering_button"
          aria-controls="item_menu_popup"
          aria-haspopup
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            // alert("ㅋㅋㅋㅋ");
            menuRef.current?.toggle(e);
          }}
        >
          <Menu
            model={items}
            popup
            ref={menuRef}
            id="item_menu_popup"
            color="${({theme}) => theme.color.black}"
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 16,
              color: "${({theme}) => theme.color.black}",
              boxShadow: "0px -8px 36px 0px rgba(0, 0, 0, 0.17)",
              borderRadius: 16,
              width: 180,
            }}
          />
          <Meatball fill={isDarkMode ? "white" : "black"} />
        </S.FolderHoveringButton>
        <div
          onClick={() => {
            if (toggles.includes(node.id)) {
              var copy = [...toggles];
              copy = copy.filter((n) => n !== node.id);
              setToggles(copy);
            } else {
              setToggles([...toggles, node.id]);
            }
            onToggle();
          }}
        >
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </S.FolderNodeWrapper>
      <S.FolderDivider ref={deviderRef} className="isOpen" />
    </>
  );
};

export default FolderItem;

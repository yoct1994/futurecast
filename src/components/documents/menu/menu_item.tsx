import React, { useEffect, useRef } from "react";
import * as S from "../../menubar/styles";
import { Link } from "react-router-dom";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Menu } from "primereact/menu";
import { ReactComponent as ArrowUp } from "../../../assets/Sidebar/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../../assets/Sidebar/ArrowDown.svg";
import { ReactComponent as FolderIcon } from "../../../assets/Sidebar/FolderIcon.svg";
import { ReactComponent as Meatball } from "../../../assets/Sidebar/meatball.svg";
import { ReactComponent as Remove } from "../../../assets/Sidebar/Remove.svg";
import { ReactComponent as Edit } from "../../../assets/Sidebar/Edit_Icon.svg";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { Cookies } from "react-cookie";

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

const PopupMenuItem = ({
  depth,
  node,
  toggles,
  setToggles,
  isOpen,
  onToggle,
  toast,
  setDeleteId,
  showDialog,
  allNodes,
}: Props) => {
  const menuRef = useRef<Menu>(null);
  const deviderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // {
    //   /* {toggles.includes(node.parent) &&
    //     } */
    // }
    console.log("is open!", isOpen);
    if (
      toggles.includes(node.parent) &&
      allNodes.indexOf(node) === allNodes.length - 1
    ) {
      deviderRef.current?.classList.add("isOpen");
    } else {
      deviderRef.current?.classList.remove("isOpen");
    }
  }, [isOpen]);

  const items: MenuItem[] = [
    {
      label: "Rename",
      icon: <Edit />,
      command: () => {
        // toast.current?.show({
        //   severity: "success",
        //   summary: "Success",
        //   detail: "File created",
        //   life: 3000,
        // });
      },
    },
    {
      label: "Remove",
      icon: <Remove />,
      command: async () => {
        console.log("=======document delete=======", node.data?.id);
        setDeleteId(`${node.data?.id}`);
        new Cookies().set("deleteId", node.data?.id);
        showDialog(true);
      },
    },
  ];

  return (
    <>
      <S.FolderNodeWrapper
        depth={depth}
        className={`depth${depth}`}
        as={Link}
        to={`/document/${node.data?.id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <S.PageDividerWrapper
          idx={allNodes.indexOf(node)}
          length={allNodes.length - 1}
        >
          <S.PageDivider parent={`${node.parent}`} />
        </S.PageDividerWrapper>
        <S.FolderNodeText depth={depth}>{node.text}</S.FolderNodeText>
        {node.parent === 0 ? (
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
        ) : (
          <></>
        )}
        <S.HoveringButton
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
            color="rgba(25, 25, 25, 1)"
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 16,
              gap: 4,
              color: "rgba(25, 25, 25, 1)",
              boxShadow: "0px -8px 36px 0px rgba(0, 0, 0, 0.17)",
              borderRadius: 16,
              width: 160,
            }}
          />
          <Meatball />
        </S.HoveringButton>
      </S.FolderNodeWrapper>
      <S.FolderDivider ref={deviderRef} />
    </>
  );
};

export default PopupMenuItem;

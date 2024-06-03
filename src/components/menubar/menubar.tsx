import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Arrow } from "../../assets/Arrow.svg";
import { ReactComponent as Line } from "../../assets/Line.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import { ReactComponent as Create } from "../../assets/CreateFolder.svg";
import { ReactComponent as ModalIcon } from "../../assets/ModalIcon.svg";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as Generate } from "../../assets/GenerateDocument.svg";
import { ReactComponent as GenerateDocument } from "../../assets/Generate Document.svg";
import { ReactComponent as ArrowUp } from "../../assets/Sidebar/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../assets/Sidebar/ArrowDown.svg";
import { ReactComponent as ArrowRight } from "../../assets/Sidebar/ArrowRight.svg";
import { ReactComponent as FolderIcon } from "../../assets/Sidebar/FolderIcon.svg";
import { ReactComponent as Meatball } from "../../assets/Sidebar/meatball.svg";
import { ReactComponent as SmallLogo } from "../../assets/logo_small.svg";
import { ReactComponent as RowDelete } from "../../assets/RowDelete.svg";
import { NodeModel, Tree } from "@minoru/react-dnd-treeview";
import { Cookies } from "react-cookie";
import {
  deletePage,
  getNavBar,
  makeCollection,
  moveCollectionItem,
} from "../../server/server";
import { Skeleton } from "primereact/skeleton";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useRecoilState } from "recoil";
import {
  deleteIdValue,
  menubarOpenState,
  showDeleteModal,
  treeDataState,
} from "../../recoil/recoil";
import { Link, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import PopupMenuItem from "../documents/menu/menu_item";

type Props = {
  children: any;
};

const Menubar = ({ children }: Props) => {
  const { id } = useParams();

  const cookies = new Cookies();
  const menubar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toast = useRef<Toast>(null);
  const collectoinInputRef = useRef<HTMLInputElement>(null);

  const [toggles, setToggles] = useState<(number | string)[]>([1]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreatePage, setShowCreatePage] = useRecoilState(showDeleteModal);
  const [isOpen, setIsOpen] = useRecoilState(menubarOpenState);

  const [treeData, setTreeData] = useRecoilState(treeDataState);
  const [deleteId, setDeleteId] = useRecoilState(deleteIdValue);

  const getNav = async (isRefresh: boolean) => {
    if (isRefresh || treeData.length === 0) {
      await getNavBar()
        .then((res) => {
          console.log(res.data);
          const data = JSON.parse(res.data);
          console.log(data);

          if (res.status === 401) {
            console.log("data : ", data);
            if (data.detail === "Token expired") {
              cookies.remove("TOKEN");
              window.location.href = "/login";
            }
            return;
          }

          const collections = data.collections;
          const rootPages = data.root_pages;

          console.log(collections, rootPage);

          const node: NodeModel<any>[] = [];

          for (var collection of collections) {
            console.log(collection);
            node.push({
              id: collection.id,
              parent: 0,
              droppable: true,
              text: collection.name,
              data: {
                type: "FOLDER",
                id: collection.id,
              },
            });

            for (var page of collection.pages) {
              node.push({
                id: `${collection.id}-${page.page_id}`,
                parent: collection.id,
                text: page.document_query.full_text,
                data: {
                  type: "PAGE",
                  id: page.page_id,
                },
              });
            }
          }

          const now = new Date();

          node.push({
            id: 1,
            parent: 0,
            droppable: false,
            text: `${now.toLocaleDateString("en-US", {
              month: "long",
            })} ${now.getDate()}`,
            data: {
              type: "PAGES",
            },
          });

          for (var rootPage of rootPages) {
            node.push({
              id: rootPage.id,
              parent: 1,
              text: `${rootPage.documents[0].document_query.full_text}`,
              data: {
                type: "PAGE",
                id: rootPage.id,
              },
            });
          }

          console.log(node);

          setTreeData(node);
        })
        .catch((err) => {
          console.log(err.detail);
        });
    }
  };

  useEffect(() => {
    getNav(false);
  }, []);

  const handleDrop = async (newTree: NodeModel<any>[]) => {
    const checkTree = newTree.filter((node: any) => {
      return node.data?.type === "PAGE" && node.parent === 0;
    });

    let index = -1;

    const selectNode = treeData.filter((node, idx) => {
      if (!newTree.includes(node)) {
        index = idx;
      }
      return !newTree.includes(node);
    });

    console.log(selectNode, index);

    if (checkTree.length === 0) {
      console.log(treeData);

      if (selectNode[0].parent === 1) {
        newTree.splice(index + 1, 0, {
          id: newTree.length,
          parent: selectNode[0].parent,
          text: selectNode[0].text,
          data: selectNode[0].data,
        });
      }
      console.log(newTree);

      const item = newTree.find((i) => {
        return i.parent !== 1 && i.data?.id === selectNode[0].data.id;
      });

      await moveCollectionItem(`${item?.parent}`, `${item?.data.id}`).then(
        (res) => {
          const data = JSON.parse(res.data);

          toast.current?.show({
            severity:
              res.status === 200 || res.status === 201 ? "success" : "error",
            summary:
              res.status === 200 || res.status === 201 ? "Success" : "Error",
            detail:
              res.status === 200 || res.status === 201
                ? "Success to move collection"
                : data.detail,
            life: 3000,
          });

          if (res.status === 200 || res.status === 201) {
            setTreeData(newTree);
          }
          console.log(res.data);
        }
      );
    }
  };

  return (
    <S.MenuWrapper ref={menubar} className={isOpen ? "" : "close"}>
      <S.MenubarWrapper>
        <S.MenubarContainer ref={menu} className={isOpen ? "" : "close"}>
          <S.MenuLogoContainer>
            <Logo />
            <Create
              onClick={() => {
                setShowCreateModal(true);
              }}
            />
          </S.MenuLogoContainer>
          <S.NewFolderButton
            as={Link}
            to={"/"}
            onClick={() => {
              // setShowCreatePage(true);
            }}
          >
            <Generate />
            NEW PAGE
          </S.NewFolderButton>
          {treeData.length === 0 ? (
            <S.DndLoadingArea>
              <Skeleton width="100%" height={"45px"} />
              <Skeleton width="100%" height={"45px"} />
              <Skeleton width="100%" height={"45px"} />
              <Skeleton width="100%" height={"45px"} />
              <Skeleton width="100%" height={"45px"} />
            </S.DndLoadingArea>
          ) : (
            <S.DndArea>
              <Tree<any>
                tree={treeData}
                rootId={0}
                onDrop={handleDrop}
                sort={false}
                enableAnimateExpand={true}
                initialOpen={toggles}
                render={(node, { depth, isOpen, onToggle }) => {
                  if (node.data?.type === "PAGES") {
                    return (
                      <S.LatestDocumentsWrapper depth={depth} key={node.id}>
                        <S.LatestDocumentsNodeText>
                          {node.text}
                        </S.LatestDocumentsNodeText>
                      </S.LatestDocumentsWrapper>
                    );
                  }

                  if (depth === 1) {
                    return (
                      <PopupMenuItem
                        setDeleteId={setDeleteId}
                        showDialog={setShowCreatePage}
                        key={node.id}
                        depth={depth}
                        node={node}
                        toggles={toggles}
                        setToggles={setToggles}
                        isOpen={isOpen}
                        onToggle={onToggle}
                        toast={toast}
                      />
                    );
                  }

                  return (
                    <S.FolderNodeWrapper
                      key={node.id}
                      depth={depth}
                      className={`depth${depth}`}
                    >
                      {node.parent === 0 ? <FolderIcon /> : <></>}
                      <S.FolderNodeText depth={depth}>
                        {node.text}
                      </S.FolderNodeText>
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
                      {node.parent !== 0 && (
                        <S.HoveringButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="hovering_button"
                        >
                          <Meatball />
                        </S.HoveringButton>
                      )}
                    </S.FolderNodeWrapper>
                  );
                }}
                dragPreviewRender={(monitorProps) => (
                  <S.NodeDragPreview>
                    {monitorProps.item.text}
                  </S.NodeDragPreview>
                )}
              />
            </S.DndArea>
          )}
          <S.UserAccountWrapper>
            <S.UserAccountContiner>
              <Logout
                onClick={() => {
                  const cookies = new Cookies();
                  cookies.remove("TOKEN");

                  window.location.replace("/login");
                }}
              />
              <S.UserEmailText>guest@lgsearch.ai</S.UserEmailText>
            </S.UserAccountContiner>
          </S.UserAccountWrapper>
        </S.MenubarContainer>
        {!isOpen && (
          <S.SmallLogoContainer>
            <SmallLogo />
            <S.FolderAddButton
              onClick={() => {
                setShowCreatePage(true);
              }}
            >
              <FolderIcon />
            </S.FolderAddButton>
          </S.SmallLogoContainer>
        )}
        <S.MenubarDisableIconWrapper
          onClick={() => {
            if (menubar.current) {
              if (menubar.current.classList.contains("close")) {
                menubar.current.classList.remove("close");
                menu.current?.classList.remove("close");
                setIsOpen(true);
              } else {
                menubar.current.classList.add("close");
                menu.current?.classList.add("close");
                setIsOpen(false);
              }
            }
          }}
        >
          {isOpen && <Arrow className="arrow" />}
          <Line className="line" />
          {!isOpen && <ArrowRight className="close_open_icon" />}
        </S.MenubarDisableIconWrapper>
      </S.MenubarWrapper>
      {showCreateModal && (
        <S.NewFolderPopupWrapper
          onClick={() => {
            setShowCreateModal(false);
          }}
        >
          <S.NewFolderPopupContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.NewFolderTitleContainer>
              <ModalIcon color="#000000" />
              <S.NewFolderTitleText>Create folder</S.NewFolderTitleText>
              <Close
                onClick={(e) => {
                  setShowCreateModal(false);
                }}
              />
            </S.NewFolderTitleContainer>
            <S.NewFolderInputWrapper>
              <S.NewFolderInput
                ref={collectoinInputRef}
                placeholder="Folder name"
              />
              <S.NewFolderSaveButton
                onClick={async (e) => {
                  if (collectoinInputRef.current?.value === "") {
                    toast.current?.show({
                      severity: "error",
                      summary: "Error",
                      detail: "Please write the name of the collection.",
                      life: 3000,
                    });
                    return;
                  }

                  await makeCollection(
                    collectoinInputRef.current?.value || "Untitled"
                  ).then(async (res) => {
                    const data = JSON.parse(res.data);

                    toast.current?.show({
                      severity:
                        res.status === 200 || res.status === 201
                          ? "success"
                          : "error",
                      summary:
                        res.status === 200 || res.status === 201
                          ? "Success"
                          : "Error",
                      detail:
                        res.status === 200 || res.status === 201
                          ? "Success to create collection"
                          : data.detail,
                      life: 3000,
                    });

                    if (res.status === 200 || res.status === 201) {
                      setTreeData((e) => []);
                      setShowCreateModal(false);
                      await getNav(true).then((res) => {});
                    }
                  });
                }}
              >
                SAVE
              </S.NewFolderSaveButton>
            </S.NewFolderInputWrapper>
          </S.NewFolderPopupContainer>
        </S.NewFolderPopupWrapper>
      )}
      {showCreatePage && (
        <S.NewFolderPopupWrapper
          onClick={() => {
            setShowCreatePage(false);
          }}
        >
          <S.NewFolderPopupContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.NewFolderTitleContainer>
              <RowDelete />
              <S.NewFolderTitleText>
                Do you really want to delete the page?
              </S.NewFolderTitleText>
              <Close
                onClick={(e) => {
                  setDeleteId("");
                  cookies.remove("deleteId");
                  setShowCreatePage(false);
                }}
              />
            </S.NewFolderTitleContainer>
            <S.NewPageButtonContainer>
              <S.NewPageCancelButton
                onClick={(e) => {
                  setDeleteId("");
                  cookies.remove("deleteId");
                  setShowCreatePage(false);
                }}
              >
                Cancel
              </S.NewPageCancelButton>
              <S.NewPageSaveButton
                onClick={async (e) => {
                  // console.log("=======document delete=======", deleteId);

                  const deleteId = cookies.get("deleteId");

                  await deletePage(deleteId).then((res) => {
                    const data = JSON.parse(res.data);

                    toast.current?.show({
                      severity:
                        res.status === 200 || res.status === 201
                          ? "success"
                          : "error",
                      summary:
                        res.status === 200 || res.status === 201
                          ? "Success"
                          : "Error",
                      detail:
                        res.status === 200 || res.status === 201
                          ? "Success to delete page"
                          : data.detail,
                      life: 3000,
                    });

                    if (res.status === 200 || res.status === 201) {
                      setShowCreatePage(false);
                      setTreeData((e) =>
                        e.filter((item) => item.data.id !== deleteId)
                      );
                      setDeleteId("");
                      setShowCreatePage(false);
                      if (id === deleteId) {
                        cookies.remove("deleteId");
                        window.location.href = "/";
                      }
                    }
                    console.log(res.data);
                  });
                }}
              >
                Yes, I do
              </S.NewPageSaveButton>
            </S.NewPageButtonContainer>
          </S.NewFolderPopupContainer>
        </S.NewFolderPopupWrapper>
      )}
      {children}
      <Toast
        ref={toast}
        style={{
          fontFamily: "LG_Smart_Regular",
          gap: 10,
        }}
      />
    </S.MenuWrapper>
  );
};

export default Menubar;

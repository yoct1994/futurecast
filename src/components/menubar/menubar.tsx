import { lazy, useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as LogoDark } from "../../assets/LogoDark.svg";
import { ReactComponent as Arrow } from "../../assets/Arrow.svg";
import { ReactComponent as Line } from "../../assets/Line.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import { ReactComponent as Create } from "../../assets/CreateFolder.svg";
import { ReactComponent as ModalIcon } from "../../assets/ModalIcon.svg";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as Generate } from "../../assets/GenerateDocument.svg";
import { ReactComponent as GenerateIcon } from "../../assets/Generate.svg";
import { ReactComponent as ArrowRight } from "../../assets/Sidebar/ArrowRight.svg";
import { ReactComponent as SmallLogo } from "../../assets/logo_small.svg";
import { ReactComponent as RowDelete } from "../../assets/RowDelete.svg";
import { ReactComponent as Moon } from "../../assets/toggle/moon.svg";
import { ReactComponent as Sun } from "../../assets/toggle/sun.svg";
import { NodeModel, Tree } from "@minoru/react-dnd-treeview";
import { Cookies } from "react-cookie";
import {
  deleteFolder,
  deletePage,
  getNavBar,
  makeCollection,
  moveCollectionItem,
  renameFolder,
  renamePage,
} from "../../server/server";
import { Skeleton } from "primereact/skeleton";
import { useRecoilState } from "recoil";
import {
  deleteIdValue,
  isDarkModeState,
  isLoadingNavState,
  menubarOpenState,
  showDeleteModal,
  showRenameState,
  treeDataState,
} from "../../recoil/recoil";
import { Link, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import PopupMenuItem from "../documents/menu/menu_item";
import { auth } from "../../utils/firebase";
import FolderItem from "../documents/menu/folder_item";
import { User } from "firebase/auth";
import { ThemeContext } from "styled-components";

type Props = {
  children: any;
};

const Menubar = ({ children }: Props) => {
  const { id } = useParams();

  const theme = useContext(ThemeContext);

  const cookies = new Cookies();
  const menubar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toast = useRef<Toast>(null);
  const collectoinInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const [toggles, setToggles] = useState<(number | string)[]>([1]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreatePage, setShowCreatePage] = useRecoilState(showDeleteModal);
  const [showRename, setShowRename] = useRecoilState(showRenameState);
  const [isOpen, setIsOpen] = useRecoilState(menubarOpenState);

  const [value, setValue] = useState<string>("");

  const [treeData, setTreeData] = useRecoilState(treeDataState);
  const [deleteId, setDeleteId] = useRecoilState(deleteIdValue);
  const [isLoadingNav, setIsLoadingNav] = useRecoilState(isLoadingNavState);

  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  const getNav = async (isRefresh: boolean) => {
    console.log(deleteId);
    if (isRefresh || treeData.length === 0) {
      await getNavBar()
        .then(async (res) => {
          console.log(res.data);
          const data = JSON.parse(res.data);
          console.log(data);

          if (res.status === 401) {
            console.log("data : ", data);
            if (data.detail === "Token expired") {
              await auth.signOut().then((res) => {
                cookies.remove("TOKEN", {
                  path: "/",
                });
                window.location.href = "/login";
              });
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
    const getUser = async () => {
      if (!user) {
        console.log(auth.currentUser);
        setUser(auth.currentUser);
      }
    };

    getNav(false);
    getUser();
  }, []);

  useEffect(() => {
    if (isLoadingNav) {
      getNav(isLoadingNav);
      setIsLoadingNav(false);
    }
  }, [isLoadingNav]);

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
    <S.MenuWrapper ref={menubar} className={isOpen ? "open" : "close"}>
      <S.MenubarWrapper>
        <S.MenubarContainer ref={menu} className={isOpen ? "open" : "close"}>
          <S.MenuLogoContainer>
            <Link to={"/"}>{isDarkMode ? <LogoDark /> : <Logo />}</Link>
            <S.IconHoverContainer>
              <Create
                fill={isDarkMode ? "white" : "black"}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowCreateModal(true);
                }}
              />
            </S.IconHoverContainer>
          </S.MenuLogoContainer>
          <S.NewFolderButton
            as={Link}
            to={"/"}
            style={{
              cursor: "pointer",
            }}
          >
            <Generate />
            NEW PAGE
          </S.NewFolderButton>
          {treeData.length === 0 ? (
            <S.DndLoadingArea>
              <Skeleton width="100%" height={"45px"} borderRadius="8px" />
              <Skeleton width="100%" height={"45px"} borderRadius="8px" />
              <Skeleton width="100%" height={"45px"} borderRadius="8px" />
              <Skeleton width="100%" height={"45px"} borderRadius="8px" />
              <Skeleton width="100%" height={"45px"} borderRadius="8px" />
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
                    return <></>;
                  }

                  if (depth === 1) {
                    return (
                      <PopupMenuItem
                        allNodes={treeData.filter(
                          (item) => item.parent === node.parent
                        )}
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
                    <FolderItem
                      allNodes={treeData}
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
                style={{
                  cursor: "pointer",
                }}
                onClick={async () => {
                  const cookies = new Cookies();
                  console.log("LOGOUT");
                  try {
                    await auth
                      .signOut()
                      .then(async (res) => {
                        cookies.remove("TOKEN", {
                          path: "/",
                        });
                        window.location.replace("/login");
                      })
                      .catch((err) => {
                        console.log("error", err);
                      });
                  } catch (e) {
                    console.log("error", e);
                  }
                  cookies.remove("TOKEN", {
                    path: "/",
                  });
                  window.location.replace("/login");
                }}
              />
              <S.UserEmailText>
                {auth.currentUser?.email?.split("@")[0]}
              </S.UserEmailText>
            </S.UserAccountContiner>
            <S.DarkModeToggleWrapper
              // value={isDarkMode ? "on" : "off"}
              checked={!isDarkMode}
              className={cookies.get("is_dark_mode") ? "dark_mode" : ""}
              onCheckedChange={(e) => {
                console.log("click");
                cookies.remove("is_dark_mode", {
                  path: "/",
                });
                cookies.remove("is_dark_mode", {
                  path: "/",
                });
                if (isDarkMode) {
                  setIsDarkMode(false);
                  cookies.set("is_dark_mode", false, {
                    path: "/",
                  });
                } else {
                  setIsDarkMode(true);
                  cookies.set("is_dark_mode", true, {
                    path: "/",
                  });
                }
              }}
            >
              <S.DarkModeToggleIcon type="moon" isDarkMode={isDarkMode}>
                <Moon />
              </S.DarkModeToggleIcon>
              <S.DarkModeToggleIcon type="sun" isDarkMode={isDarkMode}>
                <Sun />
              </S.DarkModeToggleIcon>
              <S.DarkModeToggleThumb />
            </S.DarkModeToggleWrapper>
          </S.UserAccountWrapper>
        </S.MenubarContainer>
        {!isOpen && (
          <S.SmallLogoContainer>
            <SmallLogo />
            <S.FolderAddButton
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                // setShowCreatePage(true);
                window.location.href = "/";
              }}
            >
              <GenerateIcon fill="#757575" />
            </S.FolderAddButton>
          </S.SmallLogoContainer>
        )}
        <S.MenubarDisableIconWrapper
          onClick={() => {
            if (menubar.current) {
              if (menubar.current.classList.contains("close")) {
                menubar.current.classList.remove("close");
                menu.current?.classList.remove("close");
                menubar.current.classList.add("open");
                menu.current?.classList.add("open");
                setIsOpen(true);
              } else {
                menubar.current.classList.remove("open");
                menu.current?.classList.remove("open");
                menubar.current.classList.add("close");
                menu.current?.classList.add("close");
                setIsOpen(false);
              }
            }
          }}
        >
          {isOpen && <Arrow className="arrow" stroke={theme?.color.black} />}
          <Line className="line" stroke={theme?.color.black} />
          {!isOpen && (
            <ArrowRight
              className="close_open_icon"
              stroke={theme?.color.black}
            />
          )}
        </S.MenubarDisableIconWrapper>
      </S.MenubarWrapper>
      {showCreateModal && (
        <S.NewFolderPopupWrapper
          onClick={() => {
            setShowCreateModal(false);
            setValue("");
          }}
        >
          <S.NewFolderPopupContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.NewFolderTitleContainer>
              <ModalIcon color="#000000" style={{}} />
              <S.NewFolderTitleText>Create folder</S.NewFolderTitleText>
              <S.CloseButton>
                <Close
                  fill={theme?.color.black}
                  onClick={(e) => {
                    setShowCreateModal(false);
                    setValue("");
                  }}
                />
              </S.CloseButton>
            </S.NewFolderTitleContainer>
            <S.NewFolderInputWrapper>
              <S.NewFolderInput
                ref={collectoinInputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
                placeholder="Folder name"
              />
              {value.length === 0 ? (
                <S.DisabledNewFolderSaveButton>
                  SAVE
                </S.DisabledNewFolderSaveButton>
              ) : (
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
                        // setTreeData((e) => []);
                        setShowCreateModal(false);
                        await getNav(true).then((res) => {});
                      }
                    });
                  }}
                >
                  SAVE
                </S.NewFolderSaveButton>
              )}
            </S.NewFolderInputWrapper>
          </S.NewFolderPopupContainer>
        </S.NewFolderPopupWrapper>
      )}
      {showRename && (
        <S.NewFolderPopupWrapper
          onClick={() => {
            setShowRename(false);
            setValue("");
            cookies.remove("renameId");
            cookies.remove("renameType");
          }}
        >
          <S.NewFolderPopupContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.NewFolderTitleContainer>
              <ModalIcon color="#000000" style={{}} />
              <S.NewFolderTitleText>
                Rename
                {cookies.get("renameType") === "folder" ? " Folder" : " Page"}
              </S.NewFolderTitleText>
              <S.CloseButton>
                <Close
                  fill={theme?.color.black}
                  onClick={(e) => {
                    setShowRename(false);
                    setValue("");
                    cookies.remove("renameId");
                    cookies.remove("renameType");
                  }}
                />
              </S.CloseButton>
            </S.NewFolderTitleContainer>
            <S.NewFolderInputWrapper>
              <S.NewFolderInput
                ref={renameInputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
                placeholder={
                  cookies.get("renameType") === "folder"
                    ? "Folder name"
                    : "Page name"
                }
              />
            </S.NewFolderInputWrapper>
            <S.RenameButtonContainer>
              {value.length === 0 ? (
                <S.DisableRenameSaveButton>SAVE</S.DisableRenameSaveButton>
              ) : (
                <S.RenameSaveButton
                  onClick={async (e) => {
                    if (renameInputRef.current?.value === "") {
                      toast.current?.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Please write the name of the collection.",
                        life: 3000,
                      });
                      return;
                    }

                    const renameId = cookies.get("renameId");
                    const renameType = cookies.get("renameType");

                    if (renameType === "folder") {
                      await renameFolder(
                        renameId,
                        renameInputRef.current?.value ?? ""
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
                              ? "Success to rename"
                              : data.detail,
                          life: 3000,
                        });

                        if (res.status === 200 || res.status === 201) {
                          // setTreeData((e) => []);
                          await getNav(true).then((res) => {
                            setShowRename(false);
                          });
                        }
                      });
                    } else {
                      await renamePage(
                        renameId,
                        renameInputRef.current?.value ?? ""
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
                              ? "Success to rename"
                              : data.detail,
                          life: 3000,
                        });

                        if (res.status === 200 || res.status === 201) {
                          // setTreeData((e) => []);
                          setShowCreateModal(false);
                          await getNav(true).then((res) => {});
                        }
                      });
                    }
                  }}
                >
                  SAVE
                </S.RenameSaveButton>
              )}
            </S.RenameButtonContainer>
          </S.NewFolderPopupContainer>
        </S.NewFolderPopupWrapper>
      )}
      {showCreatePage && (
        <S.NewFolderPopupWrapper
          onClick={() => {
            setShowCreatePage(false);
            cookies.remove("deleteId");
            cookies.remove("deleteType");
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
                Do you really want to delete the{" "}
                {cookies.get("deleteType") === "folder" ? "folder" : "page"}?
              </S.NewFolderTitleText>
              <S.CloseButton>
                <Close
                  fill={theme?.color.black}
                  onClick={(e) => {
                    setDeleteId("");
                    cookies.remove("deleteId");
                    cookies.remove("deleteType");
                    setShowCreatePage(false);
                  }}
                />
              </S.CloseButton>
            </S.NewFolderTitleContainer>
            <S.NewPageButtonContainer>
              <S.NewPageCancelButton
                onClick={(e) => {
                  setDeleteId("");
                  cookies.remove("deleteId");
                  cookies.remove("deleteType");
                  setShowCreatePage(false);
                }}
              >
                Cancel
              </S.NewPageCancelButton>
              <S.NewPageSaveButton
                onClick={async (e) => {
                  // console.log("=======document delete=======", deleteId);

                  const deleteId = cookies.get("deleteId");
                  const deleteType = cookies.get("deleteType");

                  if (deleteType === "folder") {
                    await deleteFolder(deleteId).then((res) => {
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
                          cookies.remove("deleteType");
                          window.location.href = "/";
                        }
                      }
                      console.log(res.data);
                    });
                  } else {
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
                          cookies.remove("deleteType");
                          window.location.href = "/";
                        }
                      }
                      console.log(res.data);
                    });
                  }
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
          fontFamily: "Pretendard-Regular",
          gap: 10,
        }}
      />
    </S.MenuWrapper>
  );
};

export default Menubar;

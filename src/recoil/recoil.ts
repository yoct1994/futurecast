import { NodeModel } from "@minoru/react-dnd-treeview";
import { Cookies } from "react-cookie";
import { atom } from "recoil";

export const treeDataState = atom<NodeModel<any>[]>({
  default: [],
  key: "tree_data_state",
});

export const menubarOpenState = atom<boolean>({
  default: true,
  key: "menubar_open_state",
});

export const showDeleteModal = atom<boolean>({
  default: false,
  key: "show_delete_modal_state",
});

export const deleteIdValue = atom<string>({
  default: "",
  key: "show_delete_modal_state",
});

export const isLoadingNavState = atom<boolean>({
  default: false,
  key: "is_loading_nav_state",
});

export const isDarkModeState = atom<boolean>({
  default: new Cookies().get("is_dark_mode"),
  key: "is_dark_mode_state",
});

export const showRenameState = atom<boolean>({
  default: false,
  key: "show_rename_state",
});

export const updateItemsState = atom<
  {
    data: any;
    type: "SUB_PAGE" | "QUERY" | "REFERENCE" | "CONTENT" | "DESCRIPTION";
  }[]
>({
  default: [],
  key: "update_items_state",
});

export const deleteItemsState = atom<
  {
    data: any;
    type: "SUB_PAGE" | "QUERY" | "REFERENCE" | "CONTENT" | "DESCRIPTION";
  }[]
>({
  default: [],
  key: "delete_items_state",
});

export const isEditDocumentState = atom<boolean>({
  default: false,
  key: "is_edit_document_state",
});

export const documentListState = atom<any[]>({
  default: [],
  key: "document_list_state",
});

export const referencesState = atom<any[]>({
  default: [],
  key: "reference_state",
});

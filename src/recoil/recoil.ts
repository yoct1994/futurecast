import { NodeModel } from "@minoru/react-dnd-treeview";
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

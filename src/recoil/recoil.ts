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

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface EditModalContextData {
  id: string | null;
  isEditModalCartItemOpen: boolean;
}
export interface EditModalContextType {
  editModalContextData: EditModalContextData;
  setEditModalContextData: Dispatch<SetStateAction<EditModalContextData>>;
}

export const EditModalContext = createContext<EditModalContextType | null>(
  null
);

export const useEditModalContext = () => {
  const context = useContext(EditModalContext);

  if (!context) {
    throw new Error(
      "useEditModalContext should be used inside editModal provider"
    );
  }

  return context;
};

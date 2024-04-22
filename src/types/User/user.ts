interface User {
    _id: string;
    id: string | null;
    email: string | null;
    token: string | null;
    role: string | null;

}
// export interface EditUserProps {
//     isOpen: boolean;
//     handleClose: () => void;
//     editedRow: User | null;
//     setEditedRow: React.Dispatch<React.SetStateAction<User | null>>;
//   }
//   export interface DeleteUserProps {
//     isOpen: boolean;
//     handleClose: () => void;
//     deletedItem: User | null;

//   }
// User store placeholder.
 type UserUiState = {
   selectedUserId: string | null;
 };

 type UserUiActions = {
   setSelectedUserId: (userId: string | null) => void;
 };

 export type UserState = UserUiState & UserUiActions;

 export const createUserState = (): UserState => ({
   selectedUserId: null,
   setSelectedUserId: () => undefined,
 });



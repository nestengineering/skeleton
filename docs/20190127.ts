// ----------------------In side skeleton------------------------------
interface State {
  [key: string]: any;
}

interface Props {
  [key: string]: any;
}

interface Component {
  state: State;
  props: Props;
  methods: { [key: string]: () => any };
  children: Array<any>;
}

// ----------------------In side Your Componet------------------------------
// presentation Atoms
interface Input extends Partial<Component> {
  props: { value: string; onChange: Function };
}

// presentation Atoms
interface Button extends Partial<Component> {
  props: { label: string; onClick: Function };
}

// Input.json
// {
//     props:{
//         value:'string',
//         onChange:'function',
//     }
// }

// presentation Molecules ユーザーを表示するコンポーネント
interface User extends Partial<Component> {
  props: { name: string; job: string; age: number };
  methods: { updateName: () => string };
  children: [Input, Button];
}

// ----------------------In side Your Componet------------------------------
// presentation Organisms ユーザーのリストを表示するコンポーネント
interface UserList extends Partial<Component> {
  props: { users: [] };
  methods: {
    handleName: () => {};
    handleAge: () => {};
    handleJob: () => {};
  };
  children: Array<User[]>;
}

// ----------------------In side Your Componet------------------------------
// container(Pages) ユーザーに対してREST通信するコンポーネント
interface UsersPage extends Partial<Component> {
  state: { users: [] };
  methods: {
    getUsers: () => {};
    handleName: () => {};
    handleAge: () => {};
    handleJob: () => {};
  };
  children: [Header, Sidebar, UserList, Footer];
}


// UsersPage.skeleton
// import /
// 
// {
//  state {
//      users
//  }
//  methods: {
//     getUsers
//     handleName
//     handleAge
//     handleJob
//  }
//  children: [Header, Sidebar, UserList, Footer];
// }
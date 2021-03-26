import { selector } from "recoil";
import { cartListState, userState } from "./atoms";

export const loggedInState = selector({
  key: "loggedInState",
  get: (props) => {
    const user = props.get(userState);
    if (user) return true;
    return false;
  },
});

export const userIdState = selector({
  key: "userIdState",
  get: ({ get }) => {
    const user = get(userState);
    return user._id;
  },
});

// export const loggedInState = selector({
//   key: "loggedInState",
//   get: (props) => {
//     const user = props.get(userState);
//     switch (user) {
//       case "USER_LOGIN_REQUEST":
//         return { loading: true };
//       case "USER_LOGIN_SUCCESS":
//         return { loading: false, userInfo: userState };
//       case "USER_LOGIN_FAIL":
//         // wrong
//         return { loading: false, error: userState };
//       case "USER_LOGOUT":
//         return {};
//     }
//     // if (user) return true;
//     // return false;
//   },
// });
// switch (filter) {
//       case 'Show Completed':
//         return list.filter((item) => item.isComplete);
//       case 'Show Uncompleted':
//         return list.filter((item) => !item.isComplete);
//       default:
//         return list;
//     }

// not in use

export const inCartState = selector({
  key: "inCartState",
  get: ({ get }) => {
    const cart = get(cartListState);

    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  },
});

// ===============================Recoil docs==================================
// const todoListFilterState = atom({
//   key: 'todoListFilterState',
//   default: 'Show All',
// });
// Using todoListFilterState and todoListState, we can build a filteredTodoListState selector which derives a filtered list:

// Copy
// const filteredTodoListState = selector({
//   key: 'filteredTodoListState',
//   get: ({get}) => {
//     const filter = get(todoListFilterState);
//     const list = get(todoListState);

//     switch (filter) {
//       case 'Show Completed':
//         return list.filter((item) => item.isComplete);
//       case 'Show Uncompleted':
//         return list.filter((item) => !item.isComplete);
//       default:
//         return list;
//     }
//   },
// });

// ================ dalton =================
// export const loggedInState = selector({
//   key: "loggedInState",
//   get: (props) => {
//     const user = props.get(userState);
//     if (user) return true;
//     return false;
//   },
// });

// export const userIdState = selector({
//   key: "userIdState",
//   get: ({ get }) => {
//     const user = get(userState);
//     return user._id;
//   },
// });

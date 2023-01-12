import { createStore } from "redux";
import counterReducer from "../../features/contact/ContactReducer";

export function configureStore() {
    return createStore(counterReducer);
}
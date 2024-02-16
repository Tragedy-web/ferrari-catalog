import { typedDispatch, typedRootReducer} from "../store.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useTypedDispatch = () => useDispatch<typedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<typedRootReducer> = useSelector;
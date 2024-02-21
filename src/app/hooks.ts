import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Utiliser dans toute l'application au lieu de `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Utiliser dans toute l'application au lieu de `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

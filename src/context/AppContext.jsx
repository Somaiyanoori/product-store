import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  viewMode: localStorage.getItem("viewMode") || "grid",
  selectedCategory: "all",
  language: "en",
  sortBy: "default",
  searchQuery: "",
};

export const APP_ACTIONS = {
  TOGGLE_THEME: "TOGGLE_THEME",
  SET_VIEW_MODE: "SET_VIEW_MODE",
  SET_CATEGORY: "SET_CATEGORY",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_SORT_BY: "SET_SORT_BY",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  RESET_SETTINGS: "RESET_SETTINGS",
};

function appReducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case APP_ACTIONS.SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };

    case APP_ACTIONS.SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case APP_ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload };

    case APP_ACTIONS.SET_SORT_BY:
      return { ...state, sortBy: action.payload };

    case APP_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case APP_ACTIONS.RESET_SETTINGS:
      return { ...initialState, theme: state.theme };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("viewMode", state.viewMode);
  }, [state.viewMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

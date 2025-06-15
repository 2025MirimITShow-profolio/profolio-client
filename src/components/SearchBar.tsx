import React from "react";
import { useThemeStore } from "../store/themeStore";

const SearchBar: React.FC = () => {
  const isDark = useThemeStore((state) => state.isDark);
  return (
    <div
      style={{
        width: 370,
        height: 56,
        background: isDark ? "#232334" : "#f7f7fa",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        color: isDark ? "#b0b0c3" : "#222",
        fontSize: 20,
        fontWeight: 400,
        boxSizing: "border-box",
      }}
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style={{marginRight: 12}}>
        <circle cx="11" cy="11" r="7" stroke={isDark ? "#b0b0c3" : "#222"} strokeWidth="2" />
        <path d="M20 20L17 17" stroke={isDark ? "#b0b0c3" : "#222"} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Searching project"
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: isDark ? "#b0b0c3" : "#222",
          fontSize: 20,
          width: "100%",
        }}
      />
    </div>
  );
};

export default SearchBar; 
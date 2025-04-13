import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getDetailsURL } from "../hooks/helpers";

const CATEGORIES = [
  { key: "people", label: "Personajes" },
  { key: "planets", label: "Planetas" },
  { key: "vehicles", label: "Vehículos" }
];

export default function SearchBar() {
  const { store } = useGlobalReducer();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(-1);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Buscar en las tres categorías, normalizando nombres
  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length < 2) {
      setResults([]);
      return;
    }

    let suggestions = [];
    CATEGORIES.forEach(({ key, label }) => {
      const arr = store[key];
      if (!arr) return;
      arr.forEach((item) => {
        const name = item.properties?.name ?? item.name;
        if (name && name.toLowerCase().includes(q.toLowerCase())) {
          suggestions.push({ name, uid: item.uid, category: key, label });
        }
      });
    });

    // OJO: Solo 10 resultados máximo para UX
    setResults(suggestions.slice(0, 10));
    setActiveIdx(-1);
  };

  // Navega a detailsURL
  const handleSelect = (result) => {
    setQuery("");
    setResults([]);
    navigate(getDetailsURL(result.category, result.uid));
    setActiveIdx(-1);
  };

  // Teclado (flechas y enter)
  const handleKeyDown = (e) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIdx >= 0) {
      handleSelect(results[activeIdx]);
    }
  };

  // Cierra sugerencias al blur
  const handleBlur = (e) => {
    setTimeout(() => setResults([]), 100);
  };

  return (
    <div className="position-relative" style={{ maxWidth: 350, margin: "0 auto" }}>
      <input
        type="search"
        value={query}
        placeholder="Busca en la galaxia..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="search-bar-space"
        ref={inputRef}
        aria-label="Buscar"
      />
      {results.length > 0 && (
        <ul className="list-group position-absolute w-100 shadow" style={{ zIndex: 10 }}>
          {results.map((res, i) => (
            <li
              key={`${res.category}-${res.uid}`}
              className={`list-group-item list-group-item-action ${i === activeIdx ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onMouseDown={() => handleSelect(res)}
              // mouseDown para evitar perder foco antes de navegar
            >
              <span className="fw-bold">{res.name}</span>
              <span className="text-muted small ms-2">{res.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

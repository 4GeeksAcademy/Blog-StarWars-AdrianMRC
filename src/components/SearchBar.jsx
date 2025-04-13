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

  // Buscar en las tres categorías, maneja los cambios en el input de búsqueda
  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);

    // Si la consulta tiene menos de 2 caracteres, limpia los resultados
    if (q.length < 2) {
      setResults([]);
      return;
    }

    let suggestions = [];
    CATEGORIES.forEach(({ key, label }) => {
      const arr = store[key]; // Obtiene los datos de la categoría
      if (!arr) return;
      arr.forEach((item) => {
        const name = item.properties?.name ?? item.name; // Normaliza el nombre
        if (name && name.toLowerCase().includes(q.toLowerCase())) {
          suggestions.push({ name, uid: item.uid, category: key, label });
        }
      });
    });

    // Limita los resultados a un máximo de 10
    setResults(suggestions.slice(0, 10));
    setActiveIdx(-1);
  };

  // Maneja la selección de un resultado
  const handleSelect = (result) => {
    setQuery("");
    setResults([]);
    navigate(getDetailsURL(result.category, result.uid));
    setActiveIdx(-1);
  };

  // Maneja las teclas de navegación (flechas y Enter)
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

  // Limpia los resultados al perder el foco
  const handleBlur = (e) => {
    setTimeout(() => setResults([]), 100);
  };

  return (
    <div className="position-relative" style={{ maxWidth: 350, margin: "0 auto" }}>
      {/* Input de búsqueda */}
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

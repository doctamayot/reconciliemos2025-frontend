// src/components/common/SearchBar.jsx
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="relative rounded-md shadow-sm w-full max-w-xs md:max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        name="search"
        id="search"
        value={value} // El valor viene directamente de las props
        onChange={onChange} // El manejador de cambio viene directamente de las props
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
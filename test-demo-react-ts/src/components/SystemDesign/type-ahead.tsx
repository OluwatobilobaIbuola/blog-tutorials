import React, { ChangeEvent, useState } from "react";

interface TypeaheadProps {
  suggestions: string[];
}

export const Typeahead: React.FC<TypeaheadProps> = ({ suggestions }) => {
  const [value, setValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const onSelectSuggestion = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
  };

  const onBlur = () => {
    // Hide suggestions on input blur
    setTimeout(() => setShowSuggestions(false), 500);
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Type something..."
      />

      {showSuggestions && (
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              className={`cursor-pointer`}
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

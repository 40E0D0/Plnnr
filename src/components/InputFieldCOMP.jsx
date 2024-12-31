import { IoSearchSharp } from "react-icons/io5";

export default function InputFieldCOMP({
    value,
    onChange,
    placeholder,
    bgColor = "bg-white", // Default background color
    type,
    isSearch,
    required,
    isReadOnly,
    maxLength,
    minLength,
    isNeedInfo,
    isNeedInfoText,
    pattern
}) {
    // Base classes for styling the input
    const baseClasses =
        "w-full py-2 pl-4 pr-10 rounded-md font-bold outline-none focus:outline-none focus:ring-2 focus:ring-opacity-100 ring-opacity-0 transition-all duration-250 z-10 border-2 border-gray-400";

    const readOnlyClass = isReadOnly ? "opacity-70 cursor-not-allowed" : ""; // Adjust styling for read-only

    return (
        <div className="relative w-full">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${baseClasses} ${bgColor} ${readOnlyClass}`}
                required={required}
                maxLength={maxLength}
                minLength={minLength}
                readOnly={isReadOnly}
                pattern={pattern}
            />
            {isSearch && <IoSearchSharp className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />}
            {isNeedInfo && <p className="text-xs text-gray-500 mt-1">{isNeedInfoText}</p>}
        </div>
    );
}

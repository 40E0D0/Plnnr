// utils/formatUtils.js
export const formatValue = (value, defaultValue = 'N/A') => {
    return value !== null && value !== undefined ? value : defaultValue;
};
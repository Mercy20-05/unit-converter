/**
 * Unit Converter Logic
 * Structured using a Base-Unit Factor pattern:
 * - Length base unit: Meter (m)
 * - Weight base unit: Kilogram (kg)
 */

const unitData = {
  length: {
    base: 'meter',
    units: {
      meter: { label: 'Meters (m)', factor: 1 },
      kilometer: { label: 'Kilometers (km)', factor: 1000 },
      feet: { label: 'Feet (ft)', factor: 0.3048 },
      inch: { label: 'Inches (in)', factor: 0.0254 },
      centimeter: { label: 'Centimeters (cm)', factor: 0.01 }
    }
  },
  weight: {
    base: 'kilogram',
    units: {
      kilogram: { label: 'Kilograms (kg)', factor: 1 },
      gram: { label: 'Grams (g)', factor: 0.001 },
      pound: { label: 'Pounds (lbs)', factor: 0.45359237 },
      ounce: { label: 'Ounces (oz)', factor: 0.02834952 }
    }
  }
};

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const outputValue = document.getElementById('outputValue');
const swapBtn = document.getElementById('swapBtn');
const formulaBanner = document.getElementById('formulaBanner');

/**
 * Populates unit dropdowns based on selected category
 */
function populateUnits(categoryKey) {
  const units = unitData[categoryKey].units;

  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';

  const unitKeys = Object.keys(units);

  unitKeys.forEach((key, index) => {
    const optionFrom = new Option(units[key].label, key);
    const optionTo = new Option(units[key].label, key);

    fromUnitSelect.add(optionFrom);
    toUnitSelect.add(optionTo);
  });

  // Default selection: 1st unit -> 2nd or 3rd unit for quick contrast
  fromUnitSelect.selectedIndex = 0;
  toUnitSelect.selectedIndex = unitKeys.length > 2 ? 2 : 1;
}

/**
 * Converts a value from source unit to destination unit using the base factor
 * @param {number} value
 * @param {string} category
 * @param {string} from
 * @param {string} to
 * @returns {number}
 */
function convertUnits(value, category, from, to) {
  if (from === to) return value;

  const currentCategory = unitData[category].units;
  const fromFactor = currentCategory[from].factor;
  const toFactor = currentCategory[to].factor;

  // Step 1: Convert from source to standard base unit
  const valueInBase = value * fromFactor;

  // Step 2: Convert from base unit to target unit
  return valueInBase / toFactor;
}

/**
 * Formats results to a clean number of decimal places
 * Prevents trailing zeroes like 5.0000 -> 5
 */
function formatNumber(num) {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  // Round to up to 4 decimal places, parsing back to float removes redundant trailing zeros
  return parseFloat(num.toFixed(4)).toString();
}

/**
 * Main calculation and UI update function (triggers on input)
 */
function handleConversion() {
  const category = categorySelect.value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  const rawInput = inputValue.value.trim();

  // Update formula text banner (1 FromUnit = X ToUnit)
  const singleUnitConverted = convertUnits(1, category, from, to);
  const fromLabel = unitData[category].units[from].label;
  const toLabel = unitData[category].units[to].label;
  formulaBanner.textContent = `1 ${fromLabel} = ${formatNumber(singleUnitConverted)} ${toLabel}`;

  // Check if input is empty
  if (rawInput === '' || isNaN(rawInput)) {
    outputValue.textContent = '0.00';
    return;
  }

  const val = parseFloat(rawInput);
  const result = convertUnits(val, category, from, to);
  outputValue.textContent = formatNumber(result);
}

/**
 * Swaps fromUnit and toUnit selections
 */
function handleSwap() {
  const temp = fromUnitSelect.value;
  fromUnitSelect.value = toUnitSelect.value;
  toUnitSelect.value = temp;

  handleConversion();
}

// Event Listeners
categorySelect.addEventListener('change', () => {
  populateUnits(categorySelect.value);
  handleConversion();
});

fromUnitSelect.addEventListener('change', handleConversion);
toUnitSelect.addEventListener('change', handleConversion);
inputValue.addEventListener('input', handleConversion);
swapBtn.addEventListener('click', handleSwap);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  populateUnits('length');
  inputValue.value = 1;
  handleConversion();
});
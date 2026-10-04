# Unit Converter (Length & Weight)

A lightweight, modern, and responsive Unit Converter web application built with vanilla HTML5, CSS3, and JavaScript. Developed as part of the **Veda Technology Web Development Track** assignment.

---

## 🎯 Objective & Deliverables

- **Objective**: Practice JavaScript functions, conditional logic, DOM manipulation, and dynamic form handling.
- **Key Deliverables**:
  - Support for at least 4 unit types per category (Length: *Meters, Kilometers, Feet, Inches, Centimeters*; Weight: *Kilograms, Grams, Pounds, Ounces*).
  - Dynamic `<select>` dropdowns for source and target unit selection.
  - Live conversions in real time as the user types.
  - Number formatting and rounding using `Number.toFixed()`.
  - Unit swap functionality and live conversion rate banner.

---

## 💡 Approach & Architecture

### 1. Conversion Factor Structuring (Base-Unit Pattern)
Rather than writing distinct $N \times (N - 1)$ manual pair-wise conversion functions (which scales exponentially: $O(N^2)$), this project uses a **Normalized Base-Unit Architecture** ($O(N)$):
- **Base Unit for Length**: Meter (`1.0`)
- **Base Unit for Weight**: Kilogram (`1.0`)

Every unit defines its ratio relative to this base:
$$\text{Value in Base} = \text{Input Value} \times \text{Source Factor}$$
$$\text{Target Value} = \frac{\text{Value in Base}}{\text{Target Factor}}$$

#### Why this structure is superior:
1. **Maintainability**: Adding a new unit (e.g., Yards, Miles, Milligrams) requires adding only one line with its multiplier factor to the configuration dictionary.
2. **Scalability**: Decouples the calculation logic completely from UI elements.

### 2. Live Form Handling & Reactive UI
- Attached the `input` event to the numeric field so conversions update instantly without requiring a submit button.
- Clean separation of UI rendering (`populateUnits()`, `handleSwap()`) and business logic (`convertUnits()`, `formatNumber()`).

### 3. Precision & Number Formatting
- Utilized JavaScript's `Number.toFixed(4)` combined with `parseFloat()` to retain up to 4 significant decimal places while stripping unnatural trailing zeros (e.g., displaying `2.5` instead of `2.5000`).

---

## 🚀 How to Run the Project

1. Clone or download this repository.
2. Ensure `index.html`, `style.css`, and `script.js` are in the same folder.
3. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari) or use the VS Code *Live Server* extension.

---

## 📋 Interview Question Answer

> **Q: How would you structure conversion factors?**
>
> **A:** The cleanest approach is using a **Base-Unit Dictionary Model**. Instead of hardcoding independent conversion algorithms for every pair (such as meter-to-foot, meter-to-inch, foot-to-inch), choose a standard unit as the reference base (e.g., 1 meter for length, 1 kilogram for weight). Store all units with their multiplier relative to that base. Any conversion can then be completed in two simple mathematical operations:
> 1. Multiply the input by the source factor to convert to base.
> 2. Divide the result by the target factor to yield the target unit.
>
> This reduces code complexity from $O(N^2)$ pairings to $O(N)$ data entries and prevents combinatorial bugs.

---

## 🌟 Outcome
- Instant, fluid user experience with responsive desktop and mobile layouts.
- Resilient input validation handling negative values, empty strings, and non-numeric inputs gracefully.
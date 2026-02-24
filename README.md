# TriRigth / TriRect

A simple app to verify your solutions after calculating the sides and angles of a right triangle.

The main idea is to make it easy to use and display results in a beautiful way. It's designed for people learning trigonometry who want to validate their work. Available in both Spanish and English because Spanish is my mother tongue.

## How to Use

1. Enter at least 2 known values (sides or angles)
2. Press "CALCULATE" or "CALCULAR"
3. View all calculated values with step-by-step explanations
4. See your triangle visualized on the interactive diagram

## Triangle Reference

The triangle has a right angle (90°) at the bottom-left corner:
- **a**: Vertical side (opposite to angle α)
- **b**: Horizontal side (opposite to angle β)
- **c**: Hypotenuse
- **α**: Angle at top-left
- **β**: Angle at bottom-right

## What You Can Solve

- Two sides: Get the third side and both angles
- One side and one angle: Calculate everything else
- Two angles and one side: Find the missing sides

## Tech Stack

- React with TypeScript
- Vite for development and building
- HTML5 Canvas for visualization
- Custom CSS (no UI libraries)

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

The app will be ready in the `dist/` folder for deployment.

## License

MIT

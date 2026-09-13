# Dev Stack Builder

This is my small project for the assignment. I made a landing page where users can browse different technologies and add them to their own development stack.

It is a simple React project with Vite, and it has a modern UI with hero section, tech cards, stack panel, FAQ, and footer.

## Project Idea

The main idea of this project is to help users choose the tech they want in their project stack. For example, if someone wants a frontend + backend + database setup, they can click technologies and build a custom stack.

## Tech Used

- React
- Vite
- JavaScript
- JSON
- React Toastify
- CSS

## Main Features

- Hero section with bold heading and gradient look
- Technology cards with icon, rating, badge, and description
- Add to stack button
- Remove selected item and remove all button
- Warning messages for duplicate items
- Responsive layout for mobile and desktop
- FAQ section at the bottom
- Footer with links

## How to Run This Project

1. Open the project folder in terminal.
2. Run:

```bash
npm install
npm run dev
```

3. Then open the local link shown in terminal.

## Project Structure

```bash
src/
  App.jsx
  App.css
  main.jsx
public/
  technologies.json
```

## Notes

This project uses local JSON data to load the technology list. The stack state is managed using React state, and toast messages show when a user adds, removes, or tries to add the same technology again.

## React Questions (Simple Answers)

### 1. What is JSX?
JSX is a special syntax in React that lets us write HTML-like code inside JavaScript. It makes the UI easier to write and understand.

### 2. What is the difference between props and state?
Props are data passed from one component to another. State is data inside a component that can change while the app is running.

### 3. What does useState do?
useState is a React hook used to store values in a component. In this project, I used it to save the technology list and selected stack items.

### 4. What does useEffect do?
useEffect runs after the component renders. I used it to load the technology data from the JSON file when the page first loads.

### 5. Why do list items need unique keys?
React uses keys to know which item is which when rendering lists. If keys are not unique, React can have problems updating the list correctly.

### 6. What is conditional rendering?
Conditional rendering means showing different things depending on conditions. In this project, I used it to show the empty stack message when no technology is selected.

### 7. How do data pass between parent and child components?
Parent components pass data to child components using props. Child components send data back by calling a function passed from the parent.

## Final Words

This project was a good learning experience for me. I learned how to make a landing page, work with JSON data, use React state, and build a small UI that feels closer to a real web app.

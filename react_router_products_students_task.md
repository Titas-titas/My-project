# **React Router**:

---

### **Task: Build a Multi-Page React Application Using React Router**

#### Objective:
Create a simple React application with multiple pages and routing using **React Router**. Students will practice configuring routes, navigating between pages, and passing data between components using URL parameters and state.

---

### **Requirements**:
1. **Set Up the Project**:
   - Initialize a new React project using `Create React App` or `Vite`.
   - Install React Router:
     ```bash
     npm install react-router-dom
     ```

2. **Create Pages**:
   Implement the following pages as React components:
   - **Home Page (`/`)**:
     - Displays a welcome message and navigation links to other pages.
   - **About Page (`/about`)**:
     - Includes a short description of the app and a back-to-home button.
   - **Products Page (`/products`)**:
     - Displays a list of products (mock data can be used).
     - Each product should have a "View Details" button linking to its individual product details page.
   - **Product Details Page (`/products/:productId`)**:
     - Displays detailed information about the selected product using the `productId` URL parameter.
   - **Contact Page (`/contact`)**:
     - Contains a simple form with fields for name, email, and message.
     - Displays a confirmation message after submission.

3. **Routing**:
   - Use React Router’s `<BrowserRouter>`, `<Routes>`, and `<Route>` to define routes for the pages.
   - Add a 404 page for undefined routes.

4. **Navigation**:
   - Create a navigation bar or menu that links to all main pages (Home, About, Products, Contact).
   - Use React Router’s `<Link>` or `useNavigate` for navigation.

5. **Bonus Tasks** (Optional):
   - Implement a redirect from `/home` to `/`.
   - Add nested routes within the Products page for product categories (e.g., `/products/category/electronics`).
   - Pass additional data to the Product Details page using `state` or a query string.

---

### **Mock Data Example (for Products Page)**:
```javascript
const products = [
  { id: 1, name: "Laptop", description: "High performance laptop." },
  { id: 2, name: "Smartphone", description: "Feature-rich smartphone." },
  { id: 3, name: "Headphones", description: "Noise-cancelling headphones." },
];
```

---

### **Expected Features**:
1. Smooth navigation between pages.
2. URL parameters used to display dynamic content (e.g., product details).
3. Form submission on the Contact page.

---

### **Submission**:
- Share the GitHub repository link containing the completed project.
- Ensure the app is functional and contains clear comments for each major section.

---

This task provides hands-on practice with **React Router** concepts like basic routing, navigation, URL parameters, and nested routes.
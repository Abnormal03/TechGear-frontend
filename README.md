⚙️ Tech Gear - Frontend

The client-side application for Tech Gear, a modern platform for browsing and managing high-end technology products. This project is built with React and integrates with a Node.js/Express backend using JWT authentication.

🚀 Features
Product Gallery: View all available tech gear with real-time filtering.

User Authentication: Secure Login and Signup using JSON Web Tokens (JWT).

Smart Filtering: Logged-in users see a curated list (automatically filters out their own listed products).

Persistent Sessions: User state is maintained via localStorage and a custom Auth Context.

Responsive Design: Fully optimized for mobile, tablet, and desktop views.

🛠️ Tech Stack
Framework: React.js

State Management: React Context API (Auth & Products)

Routing: React Router DOM v6

Styling: CSS Modules / Tailwind CSS (edit as per your project)

API Handling: Fetch API / Axios

📦 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/tech-gear-frontend.git
cd tech-gear-frontend
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your backend URL:

Code snippet
REACT_APP_API_URL=http://localhost:4000
Start the development server:

Bash
npm start
🔑 Authentication Workflow
The application uses a Bearer Token pattern to communicate with the backend.

Login: Upon successful login, the JWT and user profile are stored in localStorage as a stringified object.

Authorization: Every request to protected routes (like fetching products) retrieves the token:

JavaScript
const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;
Headers: The token is attached to the Authorization header as Bearer <token>.

📁 Project Structure
Plaintext
src/
├── components/ # Reusable UI (Navbar, ProductCard, etc.)
├── context/ # AuthContext and ProductContext logic
├── hooks/ # Custom hooks (useAuth, useLogout)
├── pages/ # Full page views (Home, Login, Signup)
└── App.js # Routing and Global Providers
🤝 Contributing
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Side Quest
Side Quest is a platform where companies can place bounties (projects) and students can hunt them (finish the project for the company). The platform is gamified for an engaging user experience, featuring professional animations and a seamless user interface. This repository contains the code for both the frontend and backend of the Side Quest application.

Features
Landing Page
Split Screen Design: The landing page is divided into two halves. The left half is red with a "Place a Bounty" button for companies, and the right half is blue with a "Hunt the Bounty" button for students.
Interactive Animations: Hovering over each section triggers animations that provide information about the respective options.
Responsive Design: The landing page is fully responsive, ensuring a good experience on both desktop and mobile devices.
Authentication
User Registration: Users can register as either a company or a student.
User Login: Users can log in using their credentials.
Token-Based Authentication: Secure user authentication using JWT tokens stored in local storage.
Remember Me Option: Users can choose to stay logged in by using the "Remember Me" option.
Dashboards
Student Dashboard: Displays options like Avatar Selection, Profile, Leaderboard, and Progress.
Company Dashboard: Displays options like Current Projects, Upload Projects, Progress, and Profile.
Interactive Buttons: Clicking buttons shows respective sections with interactive feedback.
Avatar Selection
Star Wars Avatars: Students can select avatars from a list of Star Wars characters.
Avatar Update: Selected avatars are updated and stored in the user profile.
Leaderboard
User Rankings: Displays a leaderboard with users ranked by points earned from completing projects.
Profile
User Profile: Displays user information like username, email, points, and avatar.
Logout Button: Allows users to log out of their account.
Technologies Used
Frontend
React: JavaScript library for building user interfaces.
React Router: For routing between different pages.
Axios: For making HTTP requests.
CSS: For styling components.
React Transition Group: For adding animations to components.
Backend
Express: Web framework for Node.js.
JWT: For token-based authentication.
Bcrypt: For hashing passwords.
Cors: For handling Cross-Origin Resource Sharing.
Body-Parser: For parsing incoming request bodies.
Getting Started
Prerequisites
Node.js
npm (Node Package Manager)
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/side-quest.git
Navigate to the project directory:

sh
Copy code
cd side-quest
Install dependencies:

sh
Copy code
npm install
Start the backend server:

sh
Copy code
npm run server
Start the frontend client:

sh
Copy code
npm run client
Access the application:
Open your browser and go to http://localhost:3000.

Project Structure
java
Copy code
side-quest/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AvatarSelection.js
│   │   ├── CompanyDashboard.js
│   │   ├── Leaderboard.js
│   │   ├── Login.js
│   │   ├── Profile.js
│   │   ├── Register.js
│   │   ├── StudentDashboard.js
│   │   └── ...
│   ├── App.js
│   ├── App.css
│   └── index.js
├── server.js
├── package.json
└── ...
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

License
This project is licensed under the MIT License. See the LICENSE file for details.

# syncnote
SyncNotes:
SyncNotes is a Chrome extension designed to streamline note-taking while browsing. Ideal for online studies and research, SyncNotes allows users to create, update, delete, and view notes directly from their browser. This eliminates the need to take screenshots and saves storage on your phone.

Demo:
Check out the production and running prototype of SyncNotes on LinkedIn - 
(https://www.linkedin.com/posts/aditi-goswami-850076261_syncnotes-chromeextension-webdevelopment-activity-7222294131354533888-wa69?utm_source=share&utm_medium=member_ios)

Features :
 1. Create Notes: Add new notes directly from the browser with titles and descriptions.
 2. Update Notes: Modify existing notes as needed.
 3. Delete Notes: Remove notes with ease.
 4. View Notes: Access all saved notes through the extension’s options page.
 5. User-Friendly: Easily manage notes without cluttering your phone storage.

Technologies Used:
 1. Chrome Extensions API: For browser extension functionality.
 2. HTML/CSS: For the user interface of the popup and options pages.
 3. JavaScript: For dynamic interactions and backend communication.
 4. Node.js: Server-side JavaScript runtime.
 5. Express: Web framework for Node.js.
 6. Axios: HTTP client for making API requests.
 7. PostgreSQL: Relational database for storing notes and user data.
    
Installation:
  Prerequisites:
    Install Node.js (https://nodejs.org/en)
    Install PostgreSQL: (https://www.postgresql.org/download/)

Setup Instructions
 1. Clone the Repository - https://github.com/Aditigoswami27/syncnote
 2.Navigate to the Project Directory:
    cd syncnotes
 3. Install Dependencies:
          1. npm install
          2. Add "type": "module" to package.json
    
 4. Download jQuery and Axios:(https://code.jquery.com/jquery-3.6.0.min.js) ,(https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js)
         
 5. Set Up PostgreSQL:
      1. Create a Database: Log in to your PostgreSQL instance and create a database.
      2. Create a Table: In the database, create a table named webnotes with the following schema:
                           CREATE TABLE webnotes (
                            id SERIAL PRIMARY KEY,
                             url TEXT,
                            title TEXT,
                            description TEXT
                                 );
      3. Update Configuration: In server.js, set your PostgreSQL credentials:
                        const db = new pg.Client({
                        user: 'your_username',
                        host: 'localhost',
                        database: 'your_database',
                        password: 'your_password',
                        port: your_port_number,
                        });
                        db.connect();
 
 6. Load the Extension in Chrome:
         1. Open Chrome and go to chrome://extensions/.
         2. Enable "Developer mode" using the toggle switch.
         3. Click "Load unpacked" and select the folder containing your extension files.
         4. Pin the extension to your toolbar for easy access.
 
 7. Start the Server:
       node/nodemon server.js

 8. Refresh the Extension:
After making changes to manifest.json or any other files, go back to chrome://extensions/ and click the "Reload" button for the SyncNotes extension.

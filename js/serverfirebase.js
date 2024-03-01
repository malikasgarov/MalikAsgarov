// firebaseFunctions.js

// Initialize Firebase with your project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Function to submit high score
function submitHighScore(userId, score) {
    db.collection('highscores').doc(userId).set({
        score: score
    }, { merge: true });
}

// Function to get high scores
function getHighScores() {
    return db.collection('highscores').orderBy('score', 'desc').limit(10).get();
}

// Example of updating UI with high scores
function updateHighScoresUI(highScores) {
    // Update your webpage with high scores
    console.log('High Scores:', highScores);
}

// snakeGame.js

// Import Firebase functions
import { submitHighScore, getHighScores, updateHighScoresUI } from './firebaseFunctions';

// ... your existing game code ...
// serverfirebase.js

function updateHighScoresUI(highScores) {
    const highestScoreElement = document.getElementById('highest-score');
    if (highScores.length > 0) {
        const highestScore = highScores[0].score;
        highestScoreElement.textContent = `Highest Score: ${highestScore}`;
    } else {
        highestScoreElement.textContent = 'No high scores yet.';
    }
}

// Usage example in your game logic
const userId = "user123"; // Replace with the actual user ID
const userScore = 100; // Replace with the actual user score

submitHighScore(userId, userScore)
    .then(() => getHighScores())
    .then((querySnapshot) => {
        const highScores = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            highScores.push({ userId: doc.id, score: data.score });
        });
        updateHighScoresUI(highScores);
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });


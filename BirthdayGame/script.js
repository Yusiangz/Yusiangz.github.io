// Game data containing songs, answers, and rewards
const gameData = [
    {
        song: "song1.mp3", // Path to the first song
        answers: ["Soft Spot", "Night", "Dream", "War"],
        correct: 0, // Index of the correct answer
        reward: "This is just a warm-up!"
    },
    {
        song: "song2.mp3",
        answers: ["skeletons", "bandaids", "beside you", "less of you"],
        correct: 0,
        reward: "Another easy one since it's your birthday and I love you!"
    },
    {
        song: "song3.mp3",
        answers: ["Good Luck, Babe!", "GODSPEED", "Bed Chem", "Pocket Locket"],
        correct: 2,
        reward: "Not too bad!"
    },
    {
        song: "song4.mp3",
        answers: ["友谊长存", "人生，起起落落落落落", "在加納共和國離婚", "我很快樂"],
        correct: 0,
        reward: "Haha! This one is funny. Can you even read them?"
    },
    {
        song: "song5.mp3",
        answers: ["Rockstar", "1-800-hot-n-fun", "Sticky", "CRAZY"],
        correct: 1,
        reward: "All the girly girls!"
    },
    {
        song: "song6.mp3",
        answers: ["Just To Die", "Euphoria", "Amen", "Id"],
        correct: 3,
        reward: "Had to put this here just to prove a point hehe."
    },
    {
        song: "song7.mp3",
        answers: ["When I Was Your Man", "Die with a Smile", "Best Part", "Easy on Me"],
        correct: 0,
        reward: "Sigh... I miss you so much."
    },
    {
        song: "song8.mp3",
        answers: ["Supernatural", "Super Shy", "How Sweet", "Bubble Gum"],
        correct: 2,
        reward: "And how sweet you taste too :( "
    },
    {
        song: "song9.mp3",
        answers: ["BATTER UP", "FOREVER", "SHEESH", "STUCK IN THE MIDDLE"],
        correct: 1,
        reward: "I'll love you forever and ever and i hope you do too"
    },
    {
        song: "song10.mp3",
        answers: ["I AM", "HEYA", "LOVE DIVE", "KITSCH"],
        correct: 0,
        reward: "I remember you always getting this wrong HAHAH"
    },
    {
        song: "song11.mp3",
        answers: ["Ghost", "Lonely", "Monster", "What Was I Made For"],
        correct: 1,
        reward: "Me right now without you..."
    }
    // Add more levels with different songs
];


// Access the HTML elements
const game = document.getElementById("game");
const startButton = document.getElementById("startGame");

// Variables to keep track of the game state
let currentLevel = 0;
let score = 0;
let timer;
let timeLeft;
let currentAudio; // To control the current playing audio

// Start the game when the button is clicked
startButton.addEventListener("click", () => {
    startGame();
});

// Function to start or continue the game
function startGame() {
    if (currentLevel < gameData.length) {
        const level = gameData[currentLevel];
        showLevel(level); // Show the current level
    } else {
        // Stop any currently playing song
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset the audio
        }

        // Display the final message, play the video, and add the "Next" button
        game.innerHTML = `
            <h2>Happy Birthday, Love!</h2>
            <p>Final Score: ${score}</p>
            <p>Here's your final surprise: </p>
            <video id="finalVideo" width="400" controls autoplay>
                <source src="Unboxing.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <br>
            <button id="nextButton">Next</button>
        `;

        // When the "Next" button is clicked, move to the letter page
        document.getElementById("nextButton").addEventListener("click", () => {
            showFinalLetter();
        });
    }
}

// Array of image sources for the gallery
const imageGallery = [
    "photo1.jpeg",
    "photo2.jpeg",
    "photo3.jpeg",
    "photo4.jpeg"
];
let currentImageIndex = 0; // Track the current image being displayed

// Function to show the gallery and allow navigation
function showFinalLetter() {
    game.innerHTML = `
        <h2>A Letter for You</h2>
        <img src="photo5.jpeg" alt="A special memory" style="width:300px; height:auto; display:block; margin: 20px auto;">
        <p>Dear connie baby,</p>
        <p> Happy 23rd Birthday!! I'm sorry for not being able to be in Singapore to celebrate this special day of yours but I still want to take this chance to  to tell you how much you mean to me...</p>
        <p> Meeting you again ~2 years ago was the best thing that has happened to me and I am so grateful to be able to call you mine. There's never a dull moment with you around and I just love how comfortable and happy you make me feel. I can still feel the warmth of your hug, kisses and cuddles even when I'm miles away and I miss it every single day. </p>
        <p> Being away from you for so long has made me appreciate you more than ever and it just proves to me how much you really mean to me and how irreplaceable you are. Everyday without you has been hard and that's when I know, I really imagine a life without you.
        <p> I love and miss you so much and I can't wait to see you again. Thank you for staying with me and loving me despite all the times i've made you upset and angry. I hope that we can get through this tough one year++ and I can make you the happiest person in this world after all this is over. All I want is to be able to see and hug u every single day and be able to call you my wife. </p>
        <p> Once again, Happy Birthday my love and I hope that you'll have a really great week ahead </p>
        <p>Love,</p>
        <p>bob :"</p>

        <!-- Display the first image in the slideshow -->
        <div class="slideshow">
            <img id="galleryImage" src="${imageGallery[0]}" alt="Memory" style="width:400px; height:auto;">
        </div>
        <br>
        <!-- Navigation buttons -->
        <button id="prevButton">Previous</button>
        <button id="nextButton">Next</button>
    `;

    // Add event listeners for Next and Previous buttons
    document.getElementById('nextButton').addEventListener('click', showNextImage);
    document.getElementById('prevButton').addEventListener('click', showPrevImage);
}

// Function to show the next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageGallery.length; // Loop back to the first image
    document.getElementById("galleryImage").src = imageGallery[currentImageIndex]; // Update the image
}

// Function to show the previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageGallery.length) % imageGallery.length; // Loop to the last image if needed
    document.getElementById("galleryImage").src = imageGallery[currentImageIndex]; // Update the image
}




// Function to show the current level's song and answers
function showLevel(level) {
    // Stop any previous song
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset the audio
    }

    // Play the new song for this level
    currentAudio = new Audio(level.song);
    currentAudio.play();

    // Display the answers for guessing
    let html = `<h2>Guess the Song</h2><ul>`;
    level.answers.forEach((answer, index) => {
        html += `<li onclick="checkAnswer(${index})">${answer}</li>`;
    });
    html += `</ul>
             <p id="reward"></p>
             <p id="timer">Time Left: 10s</p>
             <p>Score: ${score}</p>`;
    game.innerHTML = html;

    // Start the countdown timer for this level
    timeLeft = 10; // Reset timer for each level
    startTimer(level); // Start the countdown
}

// Function to start the countdown timer
function startTimer(level) {
    clearInterval(timer); // Clear any previous timer

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer when time runs out
            promptRetry(level); // Prompt the user to retry after the time runs out
        }
    }, 1000); // Decrease time every second
}

// Function to prompt the user to retry after time runs out
function promptRetry(level) {
    document.getElementById("reward").textContent = "Time's up! Press OK to try again.";
    
    // Use setTimeout to give a small delay and then restart after prompt
    setTimeout(() => {
        // Show a prompt to restart the level
        alert("Time's up! Click OK to retry.");

        // Restart the level: reset song and timer
        restartLevel(level);
    }, 1000); // Add a slight delay to show the prompt and reset
}

// Function to check if the selected answer is correct
function checkAnswer(selected) {
    const level = gameData[currentLevel]; // Get the current level data
    const correctAnswer = level.correct;
    clearInterval(timer); // Stop the timer when an answer is chosen

    if (selected === correctAnswer) {
        document.getElementById("reward").textContent = level.reward;
        score += 10; // Add points for a correct answer
        currentLevel++; // Move to the next level

        // Wait 3 seconds before moving to the next level (buffer time)
        setTimeout(() => {
            startGame();
        }, 3000);
    } else {
        // If the guess is wrong, restart the current level (song and timer)
        document.getElementById("reward").textContent = "Try again!";
        restartLevel(level);
    }
}

// Function to restart the current level after time runs out or incorrect guess
function restartLevel(level) {
    // Stop and reset the current song
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset the audio
    }

    // Play the song again
    currentAudio = new Audio(level.song);
    currentAudio.play();

    // Restart the timer
    timeLeft = 10; // Reset time left to 10 seconds
    startTimer(level); // Start the countdown again
}
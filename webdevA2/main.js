document.addEventListener("DOMContentLoaded", function () {
    // JS for Full Screen
    const btnFS = document.querySelector("#btnFS");
    btnFS.addEventListener("click", FullScreen);

    function FullScreen() {
        if (!document.fullscreenElement) {
            const elem = document.documentElement;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            }

            // Firefox
            else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            }

            // Chrome, Safari, Opera
            else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }

            // IE/Edge
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }

            btnFS.textContent = "Exit Full Screen";
        }

        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }

            // Firefox
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }

            // Chrome, Safari, Opera
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

            // IE/Edge
            else if (document.msExitFullScreen) {
                document.msExitFullScreen();
            }
            
            btnFS.textContent = "Enter Full Screen";
        }
    }

    // JS for DESKTOP NAV
    const nav = document.querySelector("#main-nav");
    window.addEventListener("scroll", scrollNav);

    function scrollNav() {
        const scrollY = window.scrollY;
        const maxRevealDistance = 150;

        const clampedScroll = Math.min(scrollY, maxRevealDistance);

        const percent = clampedScroll / maxRevealDistance;

        // 0 when hidden (-100%), 1 when fully visible (0%)
        const translateY = -100 + percent * 100;
        const opacity = percent;

        // Applies the vertical slide and fade in effects
        nav.style.transform = `translateY(${translateY}%)`;
        nav.style.opacity = opacity;

        // Clickable once it becomes at least 10%
        nav.style.pointerEvents = percent > 0.1 ? "auto" : "none";
    }

    // JS for MOBILE NAV
    const mobileNav = document.querySelector("#mobile-nav");
    const chessSection = document.querySelector("#chess");
    window.addEventListener("scroll", scrollMobileNav);

    function scrollMobileNav() {
        if (!mobileNav || !chessSection) return;

        const scrollY = window.scrollY;
        const maxRevealDistance = 150;

        const clampedScroll = Math.min(scrollY, maxRevealDistance);
        const percent = clampedScroll / maxRevealDistance;

        const translateY = 50 * (1 - percent);
        const opacity = percent;

        mobileNav.style.transform = `translateY(${translateY}px)`;
        mobileNav.style.opacity = opacity;
    }

    // JS for Showing Subtopic Pages - Both Desktop & Mobile
    const page1btn = document.querySelector("#background_nav");
    const page2btn = document.querySelector("#chess_nav");
    const page3btn = document.querySelector("#play_type_nav");

    const mobileBtn1 = document.querySelector("#mobile-btn1");
    const mobileBtn2 = document.querySelector("#mobile-btn2");
    const mobileBtn3 = document.querySelector("#mobile-btn3");
    var allpages = document.querySelectorAll(".page");

    let currentVisiblePage = null;

    // Hide all the pages, remove all the animation
    function hideall() {
        allpages.forEach(function(p) {
            p.style.display = "none";
            p.classList.remove("slide-right", "slide-left", "fade-scale", "active");
        });

        currentVisiblePage = null;
    }

    // Find the page
    function toggle(pgno) {
        const page = document.querySelector("#page" + pgno);

        // If the page is alr open, then hide it and remove the animation
        if (currentVisiblePage === page) {
            page.style.display = "none";
            page.classList.remove("slide-right", "slide-left", "fade-scale", "active");
            currentVisiblePage = null;
            return;
        }

        hideall();

        // Add the correct animation for the page when user click on the navbar
        page.style.display = "block";

        if (pgno === 1) {
            page.classList.add("slide-right");
        }

        else if (pgno === 2) {
            page.classList.add("slide-left");
        }

        else if (pgno === 3) {
            page.classList.add("fade-scale");
        }

        requestAnimationFrame(function() {
            page.classList.add("active");
        });

        currentVisiblePage = page;
    }

    // To show correct page
    page1btn.addEventListener("click", function() {
        toggle(1);
    });

    page2btn.addEventListener("click", function() {
        toggle(2);
    });

    page3btn.addEventListener("click", function() {
        toggle(3);
    });

    mobileBtn1.addEventListener("click", function() {
        toggle(1);
    });

    mobileBtn2.addEventListener("click", function() {
        toggle(2);
    });

    mobileBtn3.addEventListener("click", function() {
        toggle(3);
    });

    hideall();

    // JS for Page 1 - Timeline
    const timelineItems = document.querySelectorAll(".timeline-item");

    // To detect each item scrolls into view
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(function(item) {
        observer.observe(item);
    });

    // JS for Page 2 - Chess Pieces
    const modal = document.getElementById("chessModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close");

    const pieceInfo = {
        Chariot: {
            title: "Chariot (車 / 车)",
            description: "Moves horizontally or vertically any number of spaces."
        },
        Horse: {
            title: "Horse (馬 / 马)",
            description: "Moves in an L-shape. Cannot jump over other pieces."
        },
        Elephant: {
            title: "Elephant (象 / 相)",
            description: "Moves 2 diagonal steps. Cannot cross the river."
        },
        Advisor: {
            title: "Advisor (士 / 仕)",
            description: "Moves 1 step diagonally. Must stay inside the palace."
        },
        General: {
            title: "General (將 / 帥)",
            description: "Moves 1 step horizontally or vertically. Cannot leave palace. Avoid face-to-face."
        },
        Cannon: {
            title: "Cannon (炮 / 砲)",
            description: "Moves like Chariot but jumps exactly one piece to capture."
        },
        Soldier: {
            title: "Soldier (卒 / 兵)",
            description: "Moves forward one step. After crossing river, can also move sideways."
        }
    };

    // Show the modal (title & decription) when user click on that 'area'
    document.querySelectorAll("area[data-piece]").forEach(function(area) {
        area.addEventListener("click", function(e) {
            e.preventDefault();

            const key = area.dataset.piece;
            const info = pieceInfo[key];

            if (info) {
                modalTitle.textContent = info.title;
                modalDesc.textContent = info.description;
                modal.style.display = "block";
            }
        });
    });

    // Click to close the modal
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        modalTitle.textContent = "";
        modalDesc.textContent = "";
    });

    // Click outside the box to close the modal
    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // JS for MCQ
    const questions = [
        {
            question: "1. Which chess piece moves horizontally or vertically?",
            answers: ["General", "Cannon", "Chariot", "Soldier"],
            correct: "Chariot"
        },

        {
            question: "2. Which chess piece moves in L-shape?",
            answers: ["Chariot", "Horse", "Elephant", "Cannon"],
            correct: "Horse"
        },

        {
            question: "3. Which chess piece has to jump exactly one piece to capture?",
            answers: ["Cannon", "Chariot", "Advisor", "Elephant"],
            correct: "Cannon"
        }
    ];

    let currentQn = 0;
    let score = 0;

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("ans-btn");
    const nextButton = document.getElementById("next-btn");

    // Clear previous ans, load current question and buttons for each ans
    function showQuestion() {
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";

        let q = questions[currentQn];
        questionElement.innerText = q.question;

        q.answers.forEach(function(answer) {
            const btn = document.createElement("button");
            btn.classList.add("btn");
            btn.innerText = answer;

            if (answer === q.correct) {
                btn.dataset.correct = "true";
            }

            btn.addEventListener("click", selectAnswer);
            answerButtons.appendChild(btn);
        });
    }

    // Check if the clicked button is the correct ans
    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";

        if (isCorrect) {
            selectedBtn.style.backgroundColor = "#4CAF50";
            score++;
        }
        
        else {
            selectedBtn.style.backgroundColor = "#f44336";
        }

        // Show the correct ans
        Array.from(answerButtons.children).forEach(function(btn) {
            btn.disabled = true;

            if (btn.dataset.correct === "true") {
                btn.style.backgroundColor = "#4CAF50";
            }
        });

        nextButton.style.display = "inline-block";
    }

    // Move to the next question, shows final score in the last question
    function handleNext() {
        currentQn++;

        if (currentQn < questions.length) {
            showQuestion();
        }
        
        else {
            showScore();
        }
    }

    // Display final score, change 'next' btn to 'restart' btn
    function showScore() {
        questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerText = "Restart";
        nextButton.style.display = "inline-block";
    }

    // Restart the quiz
    function restartQuiz() {
        currentQn = 0;
        score = 0;
        nextButton.innerText = "Next";
        showQuestion();
    }

    // 'next' for the next question, 'restart' to restart the quiz
    nextButton.addEventListener("click", function() {
        if (currentQn < questions.length) {
            handleNext();
        }
        
        else {
            restartQuiz();
        }
    });

    showQuestion();

    // JS for Page 3
    const linkToPieces = document.getElementById("linkToPieces");

    // Click the link in Page3 to Page2
    if (linkToPieces) {
        linkToPieces.addEventListener("click", function (e) {
            e.preventDefault();

            const page2 = document.getElementById("page2");
            const page3 = document.getElementById("page3");

            // Make Page2 visible and add the animation for Page2, hide Page3 and remove animation for Page3
            if (page2) {
                page2.style.display = "block";
                page2.classList.add("slide-left");

                page3.style.display = "none";
                page3.classList.remove("slide-left");

                requestAnimationFrame(function() {
                    page2.classList.add("active");
                });

                // Make the animation smoothly
                setTimeout(function() {
                    const anchor = document.getElementById("pieces-con");

                    if (anchor) {
                        anchor.scrollIntoView({behavior: "smooth", block: "start"});
                    }
                }, 150);
            }
        });
    }

    // JS for Mini Game
    let gameScore = 0;
    let intervalId;
    let gameTimer;
    let totalSeconds = 120;
    let isPaused = false;
    let isGameRunning = false;
    let timerInterval;

    const chessMove = new Audio("audio/chessmove.mp3");
    const chessStart = new Audio("audio/gamestart.mp3");

    const container = document.getElementById("game-con-right");
    const scoreDisplay = document.getElementById("score");
    const startBtn = document.getElementById("start-game");
    const stopBtn = document.getElementById("stop-game");
    const timerDisplay = document.getElementById("timer");

    const pieces = [
        { name: "General", symbol: "G" },
        { name: "Advisor", symbol: "A" },
        { name: "Elephant", symbol: "E" },
        { name: "Horse", symbol: "H" },
        { name: "Cannon", symbol: "C" },
    ];

    // Timer countdown for the mini-game
    function startCountdown() {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Time Left: 2:00";

        timerInterval = setInterval(function() {
            if (!isPaused && isGameRunning) {
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;

                // Update the timer display every second
                timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                if (totalSeconds <= 0) {
                    isGameRunning = false;
                    clearInterval(timerInterval);
                    clearInterval(timerInterval);
                    alert("Game Over! Your score: " + gameScore);
                }

                totalSeconds--;
            }
        }, 1000);
    }

    function startGame() {
        clearInterval(intervalId);
        clearTimeout(gameTimer);
        clearInterval(timerInterval);

        container.innerHTML = "";
        gameScore = 0;
        scoreDisplay.textContent = "Score: 0";
        timerDisplay.textContent = "Time Left: 2:00";
        startBtn.textContent = "Restart";
        stopBtn.textContent = "Stop";
        totalSeconds = 120;
        isPaused = false;
        isGameRunning = true;

        startCountdown();
        chessStart.play();

        intervalId = setInterval(function() {
            if (!isGameRunning || isPaused) return; // Don't spawn while paused

           const piece = document.createElement("div");
            piece.classList.add("piece");

            const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
            piece.textContent = randomPiece.symbol;
            if (randomPiece.className) piece.classList.add(randomPiece.className);

            const pieceSize = 48;
            const maxX = container.clientWidth - pieceSize;
            const maxY = container.clientHeight - pieceSize;

            // Random fixed position inside container
            const startX = Math.random() * maxX;
            const startY = Math.random() * maxY;

            piece.style.left = startX + "px";
            piece.style.top = startY + "px";

            piece.addEventListener("click", function() {
                if (isPaused) return;

                // Get score when click on the 'general'
                if (randomPiece.name === "General") {
                    gameScore++;
                    scoreDisplay.textContent = `Score: ${gameScore}`;
                    chessMove.play();
                }
                
                // End game if click on the pieces that is not 'general', reset the game
                else {
                    chessMove.play();
                    alert(`You have been eaten by ${randomPiece.name}! Score: ${gameScore}`);

                    clearInterval(intervalId);
                    clearTimeout(gameTimer);
                    clearInterval(timerInterval);

                    isGameRunning = false;
                    container.innerHTML = "";
                    gameScore = 0;
                    scoreDisplay.textContent = "Score: 0";
                    timerDisplay.textContent = "Time Left: 2:00";
                    startBtn.textContent = "Start Game";
                }

                if (container.contains(piece)) {
                    container.removeChild(piece);
                }
            });

            container.appendChild(piece);

            // Pieces disappear after 3 sec
            setTimeout(function() {
                if (container.contains(piece)) {
                    container.removeChild(piece);
                }
            }, 3000);
        }, 800);
    }

    function togglePause() {
        if (!isGameRunning) return;

        if (isPaused) {
            isPaused = false;
            stopBtn.textContent = "Stop";
        }
        
        else {
            isPaused = true;
            stopBtn.textContent = "Continue";
        }
    }

    startBtn.addEventListener("click", startGame);
    stopBtn.addEventListener("click", togglePause);
});
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

            btnFS.textContent = "Exit Full Screen"
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

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const maxRevealDistance = 150;

        const clampedScroll = Math.min(scrollY, maxRevealDistance);

        const percent = clampedScroll / maxRevealDistance;

        const translateY = -100 + percent * 100;
        const opacity = percent;

        nav.style.transform = `translateY(${translateY}%)`;
        nav.style.opacity = opacity;

        nav.style.pointerEvents = percent > 0.1 ? "auto" : "none";
    });

    // JS for MOBILE NAV
    const mobileNav = document.querySelector("#mobile-nav");
    const chessSection = document.querySelector("#chess");

    window.addEventListener("scroll", () => {
        if (!mobileNav || !chessSection) return;

        const scrollY = window.scrollY;
        const maxRevealDistance = 150;

        const clampedScroll = Math.min(scrollY, maxRevealDistance);
        const percent = clampedScroll / maxRevealDistance;

        const translateY = 50 * (1 - percent); // From 50px to 0px
        const opacity = percent;

        mobileNav.style.transform = `translateY(${translateY}px)`;
        mobileNav.style.opacity = opacity;
    });

    // JS for Showing Subtopic Pages - Both Desktop & Mobile
    const page1btn = document.querySelector("#background_nav");
    const page2btn = document.querySelector("#chess_nav");
    const page3btn = document.querySelector("#play_type_nav");

    const mobileBtn1 = document.querySelector("#mobile-btn1");
    const mobileBtn2 = document.querySelector("#mobile-btn2");
    const mobileBtn3 = document.querySelector("#mobile-btn3");
    var allpages = document.querySelectorAll(".page");

    let currentVisiblePage = null;

    function hideall() {
        allpages.forEach(p => {
            p.style.display = "none";
            p.classList.remove("slide-right", "slide-left", "fade-scale", "active");
        });

        currentVisiblePage = null;
    }

    function toggle(pgno) {
        const page = document.querySelector("#page" + pgno);

        if (currentVisiblePage === page) {
            page.style.display = "none";
            page.classList.remove("slide-right", "slide-left", "fade-scale", "active");
            currentVisiblePage = null;
            return;
        }

        hideall();
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

        requestAnimationFrame(() => {
            page.classList.add("active");
        });

        currentVisiblePage = page;
    }

    page1btn.addEventListener("click", () => toggle(1));
    page2btn.addEventListener("click", () => toggle(2));
    page3btn.addEventListener("click", () => toggle(3));

    mobileBtn1.addEventListener("click", () => toggle(1));
    mobileBtn2.addEventListener("click", () => toggle(2));
    mobileBtn3.addEventListener("click", () => toggle(3));

    hideall();

    // JS for Page 1 - Timeline
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    })

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

    document.querySelectorAll("area[data-piece]").forEach(area => {
        area.addEventListener("click", e => {
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

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modalTitle.textContent = "";
        modalDesc.textContent = "";
    });

    window.addEventListener("click", e => {
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

    function showQuestion() {
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";

        let q = questions[currentQn];
        questionElement.innerText = q.question;

        q.answers.forEach(answer => {
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

        Array.from(answerButtons.children).forEach(btn => {
            btn.disabled = true;

            if (btn.dataset.correct === "true") {
                btn.style.backgroundColor = "#4CAF50";
            }
        });

        nextButton.style.display = "inline-block";
    }

    function handleNext() {
        currentQn++;

        if (currentQn < questions.length) {
            showQuestion();
        }
        
        else {
            showScore();
        }
    }

    function showScore() {
        questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerText = "Restart";
        nextButton.style.display = "inline-block";
    }

    function restartQuiz() {
        currentQn = 0;
        score = 0;
        nextButton.innerText = "Next";
        showQuestion();
    }

    nextButton.addEventListener("click", () => {
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

    if (linkToPieces) {
        linkToPieces.addEventListener("click", function (e) {
            e.preventDefault();

            const page2 = document.getElementById("page2");
            const page3 = document.getElementById("page3");

            if (page2) {
                page2.style.display = "block";
                page2.classList.add("slide-left");

                page3.style.display = "none";
                page3.classList.remove("slide-left");

                requestAnimationFrame(() => {
                    page2.classList.add("active");
                });

                setTimeout(() => {
                    const anchor = document.getElementById("pieces-con");

                    if (anchor) {
                        anchor.scrollIntoView({behavior: "smooth", block: "start"});
                    }
                }, 150);
            }
        });
    }

    // JS for Mini Game
    // const pieces = [
    //     "General", "Advisor", "Elephant", "Horse", "Chariot", "Cannon", "Soldier"
    // ];

    // const pieceRanks = {
    //     General: 7,
    //     Advisor: 6,
    //     Elephant: 5,
    //     Horse: 4,
    //     Chariot: 3,
    //     Cannon: 2,
    //     Soldier: 1,
    // }

    // let board = [];

    // // Shuffle pieces
    // function shuffle(pieces) {
    //     for (let i = pieces.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));

    //         [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    //     }
    // }

    // function generateBoard() {
    //     const allPieces = [];

    //     for (let color of ["red", "black"]) {
    //         for (let i = 0; i < 2; i++) {
    //             for (let piece of pieces) {
    //                 allPieces.push({ type: piece, color: color, revealed: false });
    //             }
    //         }
    //     }

    //     shuffle(allPieces);
    //     board = allPieces.slice(0, 16);
    // }

    // function createMiniGameBoard() {
    //     const miniBoard = document.getElementById("mini-board");
    //     miniBoard.innerHTML = "";

    //     board.forEach((piece, index) => {
    //         const cell = document.createElement("div");

    //         cell.classList.add("mini-cell");
    //         cell.dataset.index = index;
    //         cell.addEventListener("click", () => handlePieceClick(index, cell));
    //         miniBoard.appendChild(cell);
    //     });
    // }

    // function handlePieceClick(index, cell) {
    //     const piece = board[index];

    //     // If the piece is hidden, reveal
    //     if (!piece.revealed && piece.type) {
    //         piece.revealed = true;
    //         cell.classList.add("revealed", piece.color);
    //         cell.textContent = `${piece.type}`;
    //     }

    //     else {
    //         const selectedIndex = board.findIndex((p, i) =>
    //             p.revealed && i !== index && document.querySelectorAll(".mini-cell")[i].classList.contains("selected")
    //         );

    //         if (selectedIndex >= 0 && selectedIndex !== index) {
    //             const attacker = board[selectedIndex];
    //             const defender = piece;

    //             if (attacker.color !== defender.color) {
    //                 if ((attacker.type === "Soldier" && defender.type === "General") || pieceRanks[attacker.type] >= pieceRanks[defender.type]) {

    //                     // Capture
    //                     board[index] = attacker;
    //                     board[selectedIndex] = { type: "", color: "", revealed: false };
    //                     updateBoardDisplay();
    //                 }

    //                 else {
    //                     alert("Can't captire: attacker is weaker");
    //                 }
    //             }

    //             else {
    //                 alert("Can't capture: same color");
    //             }

    //             document.querySelectorAll(".mini-cell").forEach(cell => cell.classList.remove("selected"));
    //         }

    //         else {
    //             cell.classList.toggle("selected");
    //         }
    //     }
    // }

    // function updateBoardDisplay() {
    //     const cells = document.querySelectorAll(".mini-cell");

    //     board.forEach((piece, i) => {
    //         const cell = cells[i];
    //         cell.classList = "mini-cell";

    //         if (piece.revealed && piece.type) {
    //             cell.classList.add("revealed", piece.color);
    //             cell.textContent = piece.type;
    //         }

    //         else {
    //             cell.textContent = "";
    //         }
    //     });
    // }

    // document.getElementById("resetMiniGame").addEventListener("click", () => {
    //     generateBoard();
    //     createMiniGameBoard();
    // });

    // window.addEventListener("DOMContentLoaded", () => {
    //     generateBoard();
    //     createMiniGameBoard();
    // });

    const miniBoard = document.getElementById("mini-board");
    const resetButton = document.getElementById("resetMiniGame");

    const pieceCounts = {
        General: 1,
        Advisor: 2,
        Elephant: 2,
        Horse: 2,
        Chariot: 2,
        Cannon: 2,
        Soldier: 5
    };

    const colors = ["Red", "Black"];
    const pieceTypes = Object.keys(pieceCounts);

    // Generate 16 random pieces
    function generatePieces() {
        const allPieces = [];
        
        for (const color of colors) {
            for (const piece of pieceTypes) {
                const count = pieceCounts[piece];

                for (let i = 0; i < count; i++) {
                    piece.push({color, type: piece});
                }
            }
        }

        // Shuffle pieces
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [piece[i], piece[j] = [piece[j], piece[i]]];
        }

        return allPieces;
    }

    // Create the 4x4 board
    function initMiniGame() {
        miniBoard.innerHTML = "";

        const pieceList = generatePieces();

        for (let i = 0; i < 32; i++) {
            const cell = document.createElement("div");
            cell.className = "mini-cell";
            cell.dataset.color = pieceList[i].color;
            cell.dataset.type = pieceList[i].type;
            cell.textContent = ""; // hide the piece initially

            cell.addEventListener("click", () => {
                if (cell.textContent === "") {
                    cell.textContent = cell.dataset.type;
                    cell.classList.add(pieceList[i].color);
                    cell.style.backgroundColor = "#fff";
                }
            });

            miniBoard.appendChild(cell);
        }
    }

    resetButton.addEventListener("click", initMiniGame);

    // Start game on page load
    window.addEventListener("DOMContentLoaded", initMiniGame);
})
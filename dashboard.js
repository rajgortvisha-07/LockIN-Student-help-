// ========================================
// LockIn Dashboard JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------
    // 1. CHECK LOGIN
    // ----------------------------------------
    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const userData =
        localStorage.getItem("user");

    if (isLoggedIn !== "true" || userData === null) {
        window.location.href = "index.html";
        return;
    }

    const user =
        JSON.parse(userData);


    // ----------------------------------------
    // 2. DISPLAY STUDENT NAME
    // ----------------------------------------

    const userName =
        document.getElementById("userName");

    if (userName) {
        userName.textContent = user.name;
    }


    // ----------------------------------------
    // 3. DISPLAY TODAY'S DATE
    // ----------------------------------------

    const todayDate =
        document.getElementById("todayDate");

    const today = new Date();

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    if (todayDate) {

        todayDate.textContent =
            today.toLocaleDateString(
                "en-US",
                dateOptions
            );

    }


    // ----------------------------------------
    // 4. GET QUOTE FROM API
    // ----------------------------------------

    getQuote();


    // ----------------------------------------
    // 5. DISPLAY TASK SUMMARY
    // ----------------------------------------

    updateTaskSummary();

});


// ========================================
// GET QUOTE FROM API
// ========================================

async function getQuote() {

    const quoteText =
        document.getElementById("quoteText");

    const quoteAuthor =
        document.getElementById("quoteAuthor");


    if (!quoteText || !quoteAuthor) {
        console.log("Quote elements not found.");
        return;
    }


    try {

        quoteText.textContent =
            "Loading quote...";


        const response = await fetch(
            "https://dummyjson.com/quotes"
        );


        if (!response.ok) {
            throw new Error(
                "Quote API request failed"
            );
        }


        const data =
            await response.json();


        console.log("Quote API response:", data);


        // Words that should not appear
        // in LockIn quotes
        const bannedWords = [
            "god",
            "jesus",
            "christ",
            "allah",
            "bible",
            "quran",
            "koran",
            "prayer",
            "pray",
            "church",
            "mosque",
            "temple",
            "religion",
            "religious",
            "heaven",
            "hell",
            "lord",
            "buddha",
            "islam",
            "christian",
            "muslim",
            "hindu"
        ];


        // Filter out unwanted quotes
        const safeQuotes =
            data.quotes.filter(function (item) {

                const text =
                    (
                        item.quote +
                        " " +
                        item.author
                    ).toLowerCase();


                return !bannedWords.some(
                    function (word) {
                        return text.includes(word);
                    }
                );

            });


        if (safeQuotes.length === 0) {
            throw new Error(
                "No suitable quote found"
            );
        }


        // Select a random quote
        const randomIndex =
            Math.floor(
                Math.random() *
                safeQuotes.length
            );


        const selectedQuote =
            safeQuotes[randomIndex];


        // Display quote
        quoteText.textContent =
            `"${selectedQuote.quote}"`;


        quoteAuthor.textContent =
            `— ${selectedQuote.author}`;

    }

    catch (error) {

        console.error(
            "Quote error:",
            error
        );


        // Neutral fallback
        quoteText.textContent =
            "Stay focused and keep learning!";


        quoteAuthor.textContent =
            "— LockIn";

    }

}


// ========================================
// UPDATE TASK SUMMARY
// ========================================

function updateTaskSummary() {

    const userData =
        localStorage.getItem("user");


    if (userData === null) {
        return;
    }


    const user =
        JSON.parse(userData);


    // Each student gets separate tasks
    const taskKey =
        "tasks_" + user.email;


    const savedTasks =
        localStorage.getItem(taskKey);


    let tasks = [];


    if (savedTasks !== null) {

        tasks =
            JSON.parse(savedTasks);

    }


    const total =
        tasks.length;


    const completed =
        tasks.filter(function (task) {

            return task.completed === true;

        }).length;


    const pending =
        total - completed;


    const totalTasks =
        document.getElementById("totalTasks");

    const completedTasks =
        document.getElementById("completedTasks");

    const pendingTasks =
        document.getElementById("pendingTasks");


    if (totalTasks) {
        totalTasks.textContent = total;
    }


    if (completedTasks) {
        completedTasks.textContent =
            completed;
    }


    if (pendingTasks) {
        pendingTasks.textContent =
            pending;
    }

}
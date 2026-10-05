// ========================================
// LockIn - Progress JavaScript
// ========================================


document.addEventListener("DOMContentLoaded", function () {


    // ========================================
    // LOGIN PROTECTION
    // ========================================

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const userData =
        localStorage.getItem("user");


    // If user is not logged in,
    // send them back to login page

    if (isLoggedIn !== "true" || userData === null) {

        window.location.href = "index.html";

        return;
    }


    // ========================================
    // GET CURRENT STUDENT
    // ========================================

    const user =
        JSON.parse(userData);


    // ========================================
    // STUDENT-SPECIFIC TASK KEY
    // ========================================

    const taskKey =
        "tasks_" + user.email;


    // ========================================
    // GET TASKS FROM LOCAL STORAGE
    // ========================================

    const savedTasks =
        localStorage.getItem(taskKey);


    let tasks = [];


    if (savedTasks !== null) {

        try {

            tasks =
                JSON.parse(savedTasks);

        } catch (error) {

            console.error(
                "Error reading tasks:",
                error
            );

            tasks = [];
        }
    }


    // ========================================
    // TASK COUNTS
    // ========================================

    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(function (task) {

            return task.completed === true;

        }).length;


    const pendingTasks =
        totalTasks - completedTasks;


    // ========================================
    // DISPLAY TASK COUNTS
    // ========================================

    document.getElementById("totalTasks").textContent =
        totalTasks;


    document.getElementById("completedTasks").textContent =
        completedTasks;


    document.getElementById("pendingTasks").textContent =
        pendingTasks;


    // ========================================
    // DOUGHNUT CHART
    // ========================================

    const completionCanvas =
        document.getElementById("completionChart");


    if (completionCanvas) {

        // If there are no tasks,
        // show one pending section
        // so the chart does not disappear.

        let chartData;


        if (totalTasks === 0) {

            chartData = [0, 1];

        } else {

            chartData = [
                completedTasks,
                pendingTasks
            ];
        }


        new Chart(
            completionCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "Completed",
                        "Pending"
                    ],

                    datasets: [

                        {
                            data: chartData
                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            position: "bottom"

                        }

                    }

                }

            }
        );

    }


    // ========================================
    // WEEKLY COMPLETED TASKS
    // ========================================

    const days = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];


    // Start all days with 0 completed tasks

    const weeklyData = [

        0,
        0,
        0,
        0,
        0,
        0,
        0

    ];


    // Check every task

    tasks.forEach(function (task) {


        // Only count completed tasks

        if (
            task.completed === true &&
            task.completedDate
        ) {


            const completedDate =
                new Date(task.completedDate);


            // getDay()
            // 0 = Sunday
            // 1 = Monday
            // ...
            // 6 = Saturday

            const day =
                completedDate.getDay();


            weeklyData[day]++;

        }

    });


    // ========================================
    // BAR CHART
    // ========================================

    const weeklyCanvas =
        document.getElementById("weeklyChart");


    if (weeklyCanvas) {

        new Chart(
            weeklyCanvas,
            {

                type: "bar",

                data: {

                    labels: days,

                    datasets: [

                        {

                            label:
                                "Completed Tasks",

                            data:
                                weeklyData

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                stepSize: 1

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );

    }


    // ========================================
    // PROGRESS MESSAGE
    // ========================================

    const progressMessage =
        document.getElementById(
            "progressMessage"
        );


    if (progressMessage) {


        if (totalTasks === 0) {

            progressMessage.textContent =
                "Add some tasks to start tracking your progress.";


        } else if (
            completedTasks === totalTasks
        ) {

            progressMessage.textContent =
                "Excellent! You completed all your tasks.";


        } else if (
            completedTasks > 0
        ) {

            progressMessage.textContent =
                "Good progress! Keep completing your remaining tasks.";


        } else {

            progressMessage.textContent =
                "Start completing your tasks and build your progress.";

        }

    }


    // ========================================
    // LOGOUT
    // ========================================
    const logoutBtn =
        document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener(
            "click",
            function () {
                // Remove login session
                localStorage.removeItem(
                    "isLoggedIn"
                );
                localStorage.removeItem(
                    "user"
                );
                // Go back to login page
                window.location.href =
                    "index.html";
            }
        );
    }
});
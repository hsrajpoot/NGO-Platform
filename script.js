document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let userType = document.getElementById("userType").value;

    if (userType === "society") {
        window.location.href = "society_dashboard.html";
    } else if (userType === "ngo") {
        window.location.href = "ngo_dashboard.html";
    }
});



// Get User Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById("location").value = 
                position.coords.latitude + ", " + position.coords.longitude;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Submit Report
document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let reportData = {
        animalName: document.getElementById("animalName").value,
        injuryType: document.getElementById("injuryType").value,
        needs: document.getElementById("needs").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value
    };

    console.log("Report Submitted:", reportData);
    alert("Report submitted successfully!");
});



// Dummy reports (this will later come from a backend)
let reports = [
    { id: 1, animal: "Dog", location: "28.7041, 77.1025", injury: "Leg Injury", needs: "Medical Help", description: "Dog found injured on road." },
    { id: 2, animal: "Cat", location: "19.0760, 72.8777", injury: "Eye Infection", needs: "Vet Checkup", description: "Cat has serious eye infection." }
];

// Load Reports for NGOs
function loadReports() {
    let container = document.getElementById("reportsContainer");
    container.innerHTML = "";

    reports.forEach(report => {
        let reportDiv = document.createElement("div");
        reportDiv.classList.add("report");
        reportDiv.innerHTML = `
            <p><strong>Animal:</strong> ${report.animal}</p>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Injury:</strong> ${report.injury}</p>
            <p><strong>Needs:</strong> ${report.needs}</p>
            <p><strong>Description:</strong> ${report.description}</p>
            <button onclick="confirmRescue(${report.id})">Confirm Rescue</button>
        `;
        container.appendChild(reportDiv);
    });
}

// Confirm Rescue
function confirmRescue(reportId) {
    let report = reports.find(r => r.id === reportId);
if (report) {
    alert(`Rescue confirmed for ${report.animal}!`);
    
    // Move to confirmed rescues section
    let confirmedContainer = document.getElementById("confirmedRescues");
    let confirmDiv = document.createElement("div");
    confirmDiv.innerHTML = `
        <p><strong>Rescued:</strong> ${report.animal}</p>
        <p><strong>Location:</strong> ${report.location}</p>
        <p><strong>Injury:</strong> ${report.injury}</p>
        <p><strong>Needs:</strong> ${report.needs}</p>
        <p><strong>Description:</strong> ${report.description}</p>
        <p><strong>Status:</strong> ✅ Rescued</p>
    `;
    confirmedContainer.appendChild(confirmDiv);

    // Remove from pending reports
    reports = reports.filter(r => r.id !== reportId);
    loadReports();
}
}

// Upload Success Story
document.getElementById("successForm").addEventListener("submit", function(event) {
event.preventDefault();

let description = document.getElementById("successDescription").value;
let fileInput = document.getElementById("successImage");

if (fileInput.files.length > 0) {
    alert("Success story uploaded!");
    document.getElementById("successForm").reset();
} else {
    alert("Please select an image/video.");
}
});

// Load reports when page loads
document.addEventListener("DOMContentLoaded", loadReports);



// feedback and reward

document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let experience = document.getElementById("rescueExperience").value;
    let rating = document.getElementById("rating").value;

    if (rating >= 1 && rating <= 5) {
        let rewardTokens = Math.floor(Math.random() * 10) + 5; // Random 5-15 tokens
        document.getElementById("rewardMessage").innerText = `Thank you for your feedback! 🎉 You've earned ${rewardTokens} reward tokens.`;
        
        document.getElementById("feedbackForm").reset();
    } else {
        alert("Please enter a valid rating between 1 and 5.");
    }
});



// donation logic


document.getElementById("donationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let ngo = document.getElementById("ngoSelect").value;
    let amount = document.getElementById("donationAmount").value;
    let donorName = document.getElementById("donorName").value;
    let donorEmail = document.getElementById("donorEmail").value;

    if (amount > 0) {
        document.getElementById("donationMessage").innerText = `Thank you, ${donorName}! ❤️ Your donation of $${amount} to ${ngo} has been received.`;
        
        document.getElementById("donationForm").reset();
    } else {
        alert("Please enter a valid donation amount.");
    }
});



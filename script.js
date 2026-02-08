 let leads = JSON.parse(localStorage.getItem("leads")) || [];

function renderLeads() {
    document.getElementById("leadTable").innerHTML = "";

    leads.forEach((lead, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="New" ${lead.status === "New" ? "selected" : ""}>New</option>
                    <option value="Contacted" ${lead.status === "Contacted" ? "selected" : ""}>Contacted</option>
                    <option value="Converted" ${lead.status === "Converted" ? "selected" : ""}>Converted</option>
                </select>
            </td>
            <td>
                <button onclick="deleteLead(${index})">Delete</button>
            </td>
        `;

        document.getElementById("leadTable").appendChild(row);
    });

    localStorage.setItem("leads", JSON.stringify(leads));
}

document.getElementById("leadForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let lead = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        status: document.getElementById("status").value
    };

    leads.push(lead);
    renderLeads();
    this.reset();
});

function deleteLead(index) {
    leads.splice(index, 1);
    renderLeads();
}

function updateStatus(index, newStatus) {
    leads[index].status = newStatus;
    renderLeads();
}

// Load existing leads on page load
renderLeads();

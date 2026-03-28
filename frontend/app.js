const API_BASE_URL =
  window.location.protocol === "file:" ? "http://localhost:3000" : "";

let allEvents = [];

async function loadEvents() {
  const response = await fetch(`${API_BASE_URL}/events`);
  allEvents = await response.json();
  renderEvents();
}

function renderEvents() {
  const filterValue = document.getElementById("robotFilter").value;
  const filteredEvents = filterValue
    ? allEvents.filter((event) => event.robot_id.includes(filterValue))
    : allEvents;
  const eventsBody = document.getElementById("eventsBody");

  eventsBody.innerHTML = "";

  filteredEvents.forEach((event) => {
    const row = document.createElement("tr");
    const robotCell = document.createElement("td");
    const itemCell = document.createElement("td");
    const timestampCell = document.createElement("td");

    robotCell.textContent = event.robot_id;
    itemCell.textContent = event.item_id;
    timestampCell.textContent = event.timestamp;

    row.appendChild(robotCell);
    row.appendChild(itemCell);
    row.appendChild(timestampCell);
    eventsBody.appendChild(row);
  });
}

async function simulateEvent() {
  await fetch(`${API_BASE_URL}/pick`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      robot_id: "R1",
      item_id: "A",
    }),
  });

  await loadEvents();
}

document.getElementById("robotFilter").addEventListener("input", renderEvents);
document.getElementById("simulateButton").addEventListener("click", simulateEvent);

loadEvents();

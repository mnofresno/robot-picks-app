const API_BASE_URL =
  window.location.protocol === "file:" ? "http://localhost:3000" : "";

const robotOptions = ["Robot-A", "Robot-B", "Robot-C"];
const itemOptions = ["Item-123", "Item-456", "Item-789"];

let allEvents = [];
let nextSimulatedEvent = createRandomEvent();

function createRandomEvent() {
  return {
    robot_id: robotOptions[Math.floor(Math.random() * robotOptions.length)],
    item_id: itemOptions[Math.floor(Math.random() * itemOptions.length)],
  };
}

function updateSimulateButton() {
  document.getElementById(
    "simulateButton"
  ).textContent = `Simulate Event: ${nextSimulatedEvent.robot_id} / ${nextSimulatedEvent.item_id}`;
}

async function loadEvents() {
  const response = await fetch(`${API_BASE_URL}/events`);
  allEvents = await response.json();
  renderEvents();
}

function renderEvents() {
  const filterValue = document.getElementById("robotFilter").value;
  const filterField = document.getElementById("filterField").value;
  const sortedEvents = [...allEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const filteredEvents = filterValue
    ? sortedEvents.filter((event) => event[filterField].includes(filterValue))
    : sortedEvents;
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
    body: JSON.stringify(nextSimulatedEvent),
  });

  nextSimulatedEvent = createRandomEvent();
  updateSimulateButton();
  await loadEvents();
}

async function clearEvents() {
  await fetch(`${API_BASE_URL}/events`, {
    method: "DELETE",
  });

  await loadEvents();
}

document.getElementById("filterField").addEventListener("change", renderEvents);
document.getElementById("robotFilter").addEventListener("input", renderEvents);
document.getElementById("simulateButton").addEventListener("click", simulateEvent);
document.getElementById("clearButton").addEventListener("click", clearEvents);

updateSimulateButton();
loadEvents();

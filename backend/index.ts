import express from "express";
import cors from "cors";

type PickEvent = {
  robot_id: string;
  item_id: string;
  timestamp: string;
};

const app = express();
const events: PickEvent[] = [];

app.use(cors());
app.use(express.json());

app.post("/pick", (req, res) => {
  const { robot_id, item_id } = req.body as {
    robot_id?: string;
    item_id?: string;
  };

  if (typeof robot_id !== "string" || typeof item_id !== "string") {
    return res.status(400).json({ error: "robot_id and item_id are required" });
  }

  events.push({
    robot_id,
    item_id,
    timestamp: new Date().toISOString(),
  });

  if (events.length > 10) {
    events.shift();
  }

  return res.status(201).json(events[events.length - 1]);
});

app.get("/events", (_req, res) => {
  res.json(
    [...events].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  );
});

app.delete("/events", (_req, res) => {
  events.length = 0;
  res.status(204).send();
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Server running on port 3000");
});

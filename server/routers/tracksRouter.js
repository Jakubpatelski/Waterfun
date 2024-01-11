import multer from "multer";
import db from "../database/connection.js";
import { Router } from "express";

const router = Router();


router.get("/", async (req, res) => {
  const [result] = await db.execute(
    "SELECT id, name, description, img FROM tracks;"
  );

  const tracks = result.map((track) => ({
    id: track.id,
    name: track.name,
    description: track.description,
    img: track.img,
  }));

  res.send({ data: tracks });
});

router.get("/:id", async (req, res) => {
  const trackId = req.params.id;

  try {
    const [result] = await db.execute(
      "SELECT id, name, description, img FROM tracks;"[trackId]
    );

    if (result.length === 0) {
      res.status(404).send({ error: `Track with id ${trackId} not found` });
    }

    const track = {
      id: track[0].id,
      name: track[0].name,
      description: track[0].description,
      img: track.img,
    };

    res.send({ data: track });
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve track" });
  }
});

router.post("/", async (req, res) => {
  const { name, description, img } = req.body;

  console.log(req.body);
  if (!name || !description || !img) {
    return res
      .status(400)
      .send({ message: "Please provide all required credentials" });
  }
  try {
    const [response] = await db.query(
      "INSERT INTO tracks (name, description, img) VALUES (?, ?, ?)",
      [name, description, img]
    );

    console.log(response);

    return res.status(200).send({ ok: true });
  } catch (exception) {
    return res.status(500).send({ message: exception.toString() });
  }
});

let upload = multer();

router.post("/upload_image", upload.single("file"), async (req, res) => {
  const formData = new FormData();
  const blobData = new Blob([req.file.buffer]);
  formData.append("file", blobData, req.file.originalname);
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_UPLOAD_TOKEN}`,
        },
        body: formData,
      }
    );
    return res.status(200).send(await response.json());
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});


router.put("/:trackId", async (req, res) => {
  const { name, description, img } = req.body;
  const trackId = req.params.trackId;

  if (!name || !description || !img) {
    return res
      .status(400)
      .send({ message: "Please provide all required credentials" });
  }

  try {
    const [response] = await db.query(
      "UPDATE tracks SET name = ?, description = ?, img = ? WHERE id = ?",
      [name, description, img, trackId]
    );

    console.log(response);

    return res.status(200).send({ ok: true });
  } catch (exception) {
    return res.status(500).send({ message: exception.toString() });
  }
});

router.delete("/:id", async (req, res) => {
  const trackId = req.params.id;
  try {
    const [track] = await db.execute("SELECT img FROM tracks WHERE id = ?", [
      trackId,
    ]);

    await db.execute("DELETE FROM tracks WHERE id = ?", [trackId]);

    res.status(200).send({ message: `Track with ID ${trackId} deleted` });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete track" });
  }
});

export default router;

const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.listen(3000, console.log("¡Servidor encendido!"));
app.use(cors());

app.use(express.json());

app.get("/songs", (req, res) => {
  const songs = JSON.parse(fs.readFileSync("songs.json"));
  res.json(songs);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/songs", async (req, res) => {
 
    if (req.body.titulo == "" || req.body.artista == "" || req.body.tono == "") {
      console.log("debes llenar todos los campos");
      res.send("debes llenar todos los campos");
    } else {
      const song = req.body;
      const songs = JSON.parse(fs.readFileSync("songs.json"));
      songs.push(song);
      await fs.promises.writeFile(
        "songs.json",
        JSON.stringify(songs),
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("The file was written successfully!");
          }
        }
      );
      console.log("Agregados correctamente");
      res.send("canción agregada con éxito!");
    }
  });
  
  app.delete("/songs/:id", async (req, res) => {
    const { id } = req.params;
    const songs = JSON.parse(fs.readFileSync("songs.json"));
    const index = songs.findIndex((p) => p.id == id);
    songs.splice(index, 1);
    await fs.promises.writeFile("songs.json", JSON.stringify(songs));
    res.send("canción eliminado con éxito");
  });
  
  app.put("/songs/:id", async (req, res) => {
    const { id } = req.params;
    const song = req.body;
    const songs = JSON.parse(fs.readFileSync("songs.json"));
    const index = songs.findIndex((p) => p.id == id);
    songs[index] = song;
    await fs.promises.writeFile("songs.json", JSON.stringify(songs));
    res.send("canción modificado con éxito");
  });
  
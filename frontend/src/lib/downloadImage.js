import { writeFile, mkdir } from "fs/promises";
import path from "path";

await mkdir("./images", { recursive: true });

const images = [
    {
        url: "https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=700&h=560&fit=crop&auto=format",
        fileName: "footballJersey.jpg",
    },
    {
        url: "https://images.unsplash.com/photo-1591818343198-4ff334074580?w=700&h=560&fit=crop&auto=format",
        fileName: "f1Cap.jpg",
    },
    {
        url: "https://images.unsplash.com/photo-1758499535896-7be3b226d854?w=700&h=560&fit=crop&auto=format",
        fileName: "f1Jerseys.jpg",
    },
    {
        url: "https://images.unsplash.com/photo-1551479460-5e76c686816a?w=700&h=560&fit=crop&auto=format",
        fileName: "basketballJersey.jpg",
    },
];

async function downloadImage(url, filename) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download ${url}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(path.join("images", filename), buffer);
}

await Promise.all(images.map(({ url, fileName }) => downloadImage(url, fileName)));

console.log("All images downloaded!");
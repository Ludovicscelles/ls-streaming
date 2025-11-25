// Importation de la classe Film depuis le fichier Film.ts
import { Film } from "../models/Film";

// Fonction utilitaire pour créer une instance de Film

export function createFilm(
  // Paramètres data: un objet contenant les propriétés nécessaires pour créer un Film
  data: {
    id: string;
    title: string;
    genre: string;
    image: string;
    duration: number;
    releaseDate: string;
    director: string;
    // Chaque propriété de l'objet data correspond à une propriété de la classe Film
  }
): Film {
  // Création et retour d'une nouvelle instance de Film avec les données fournies
  return new Film(
    data.id,
    data.title,
    data.genre,
    data.image,
    data.duration,
    data.releaseDate,
    data.director
  );
}

// Importation de la classe Documentary depuis le fichier documentaire.ts
import { Documentary } from "../../models/Documentary";

// Fonction utilitaire pour créer une instance de Documentary
export function createDocumentary(
  // Paramètre data : un objet contenant les propriétés nécessaires pour créer un documentaire
  data: {
    id: string;
    title: string;
    genre: string;
    image: string;
    duration: number;
    releaseDate: string;
    subject: string;
  }

  // Chaque propriété de l'objet data est typée pour assurer la conformité des données
): Documentary {
  // Création et retour d'une nouvelle instance de Documentary avec les données fournies
  return new Documentary(
    data.id,
    data.title,
    data.genre,
    data.image,
    data.duration,
    data.releaseDate,
    data.subject
  );
}

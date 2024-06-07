import { Schema, model, Document } from 'mongoose';

// Créez un schéma pour les artistes
export interface IArtist extends Document {
  firstname: string;
  lastname: string;
  picture_url: string;
  genre: string;
  born_date: Date;
  city_of_birth: string;
  died_date: Date;
  chansons: Schema.Types.ObjectId[]; // Ajoutez une référence aux chansons
}

const ArtistSchema: Schema<IArtist> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  picture_url: { type: String, required: true },
  genre: { type: String, required: true },
  born_date: { type: Date, required: true },
  city_of_birth: { type: String, required: true },
  died_date: { type: Date, required: false },
  chansons: [{ type: Schema.Types.ObjectId, ref: 'Chanson' }], // Référence aux chansons
});


// Exportez le modèle Artist
export default model<IArtist>('Artist', ArtistSchema);

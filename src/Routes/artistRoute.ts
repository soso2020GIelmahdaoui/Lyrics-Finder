import {  createArtist,getAllArtists,getArtist,deleteArtist,updateArtist } from "../Controllers/artistController";
import { Router } from "express";
import  upload  from "../Middleware/multer";
import {validatorArtist} from "../helpers/validator/artistValidator"
import chonsonRoute from "./chonsonRoute"
const ArtistRouter = Router();

ArtistRouter.post('/',validatorArtist, upload.single('image'), createArtist);
ArtistRouter.get('/',getAllArtists) 
ArtistRouter.get('/:id',getArtist)
ArtistRouter.delete('/:id',deleteArtist)
ArtistRouter.put('/:id',validatorArtist,upload.single('image'),updateArtist)
ArtistRouter.use('/:id_Artist/chonsons',chonsonRoute)
export default ArtistRouter;

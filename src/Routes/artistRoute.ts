import {  createArtist,getAllArtists,getArtist,deleteArtist,updateArtist } from "../Controllers/artistController";
import { Router } from "express";
import  upload  from "../Middleware/multer";
import {validatorArtist} from "../helpers/validator/artistValidator"
import chonsonRoute from "./chonsonRoute"
import { allowedTo,protect } from "../Middleware/authMiddleware";

const ArtistRouter = Router();

ArtistRouter.post('/',protect,allowedTo(true), upload.single('image'), createArtist);
ArtistRouter.get('/',protect,allowedTo(false),getAllArtists) 
ArtistRouter.get('/:id',protect,allowedTo(false),getArtist)
ArtistRouter.delete('/:id',protect,allowedTo(true),deleteArtist)
ArtistRouter.put('/:id',protect,allowedTo(true),validatorArtist,upload.single('image'),updateArtist)
ArtistRouter.use('/:id_Artist/chonsons',protect,allowedTo(false),chonsonRoute)
export default ArtistRouter;

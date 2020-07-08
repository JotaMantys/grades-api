import mongoose from 'mongoose';
import modelSchema from "./gradeModel.js"

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.gradeModel = modelSchema; 

export { db };

import { Document } from 'mongoose';

export interface Post extends Document {
    readonly title: String,
    readonly description: String,
    readonly body: String,
    readonly author: String,
    readonly date_posted: String,
}
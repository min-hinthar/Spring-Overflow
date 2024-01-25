'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tag.model";


export async function createQuestion(params: any) {

    try {
        // Connect to MongoDB
        connectToDatabase();

        const { title, content, tags, author, path } = params;

        // Create Question from Form params
        const question = await Question.create({
            title,
            content,
            author
        })

        const tagDocuments = [];

        // Create Tags if !exist with new _id to Question
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: {$regex: new RegExp(`^${tag}$`, "i")} },
                { $setOnInsert: {name: tag}, $push: { question: question._id} },
                { upsert: true, new: true },
            )

            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments }}
        })

        // Create a record of User's ask_question action


        // Increment author's reputation by +5 points for badge status

    } catch (error) {
        console.log(error)
    }
} 
'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import { SearchParams } from "./shared.types"
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ['question', 'answer', 'user', 'tag']

export async function globalSearch(params: SearchParams) {

    try {
        await connectToDatabase();

        const { query, type } = params;

        const regexQuery = { $regex: query, $options: "i"};

        let results: any[] = [];

        const modelsAndTypes = [
            { model: Question, searchFiled:  "title", type: 'question' }, 
            { model: User, searchFiled:  "name", type: 'user' }, 
            { model: Answer, searchFiled:  "content", type: 'answer' }, 
            { model: Tag, searchFiled:  "name", type: 'tag' },
        ]

        const typeLower = type?.toLowerCase();

        if(!typeLower || !SearchableTypes.includes(typeLower)){
            // If no type is provided or the given type isn't supported, we perform a search
            // on all types of data that can be searched.
            for (const { model, searchFiled, type } of modelsAndTypes) {
                const queryResults = await model
                    .find({ [searchFiled]: regexQuery })
                    .limit(2);

                results.push(
                    ...queryResults.map((item) => ({
                        title: type === 'answer' ? `Answers containing ${query}` : item[searchFiled],
                        type,
                        id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id,
                    }))
                )
            }
        } else {
            // Otherwise, we only perform a search in the specified type.
            // Abstraction method
            const modelInfo = modelsAndTypes.find((item) => item.type === type)

            if(!modelInfo) {
                throw new Error('Invalid search type!');
            }

            const queryResults = await modelInfo.model
                .find({ [modelInfo.searchFiled]:  regexQuery })
                .limit(8)

            results = queryResults.map((item) => ({
                title: type === 'answer' ? `Answers containing ${query}` : item[modelInfo.searchFiled],
                type,
                id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id,
            }))
        }

        return JSON.stringify(results);

    } catch (error) {
        console.log(`Error fetching global results: ${error}`);
        throw error;
    }

}
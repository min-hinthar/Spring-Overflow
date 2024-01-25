"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { QuestionsSchema } from "@/lib/actions/validations"
import { Badge } from "../ui/badge";
import Image from "next/image";

const Question = () => {

// SHADCN.form
    // 1. Define your form.
    const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
        title: "",
        explanation:"",
        tags: [],
    },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    }

// Tiny.Cloud.React Editor
    const editorRef = useRef(null);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === "Enter" && field.name === 'tags') {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();
            if (tagValue !== '') {
                if(tagValue.length > 15){
                    return form.setError('tags', {
                        type: 'required',
                        message: 'Tag must be less than 15 characters!'
                    })
                }

                if(!field.value.includes(tagValue as never)) {
                    form.setValue('tags', [...field.value, tagValue])
                    tagInput.value=''
                    form.clearErrors('tags');
                }
            } else {
                form.trigger();
            }
            
            return;
    }}

    const handleTagRemove = (tag: string, field: any) => {
        const newTags = field.value.filter((t: string) => t !== tag);
        
        form.setValue('tags', newTags);
    }

    return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex w-full flex-col gap-10">
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
            <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                    Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="nt-3.5">
                    <Input className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border" 
                        placeholder="What is happening in Burma/Myanmar?"
                    {...field}
                    />
                </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
                Be descriptive and imagine you're asking a question to your friend.
            </FormDescription>
            <FormMessage className="text-red-500"/>
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                    Detailed Explanation of your Problem <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="nt-3.5">
                    {/* TODO: Add an Editor Component for Description of Form */}
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                        onInit={(evt, editor) => {
                            // @ts-ignore
                            editorRef.current = editor
                        }}
                        initialValue=""
                        init={{
                        height: 350,
                        plugins: [      'advlist', 'codesample', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                        'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                        'media', 'table', 'emoticons', 'advtemplate', 'help'
                        ],
                        toolbar: 'undo redo | codesample | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullscreen | forecolor backcolor emoticons | help',
                        menu: {
                            favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                        },
                        menubar: true,
                        content_style: 'body { font-family:Inter; font-size:16px }'
                        }}
                    />

                </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
                    Introduce the problem and expand on the details. Minimum of 20 characters!
            </FormDescription>
            <FormMessage className="text-red-500"/>
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
            <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                    Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="nt-3.5">
                {/* Need React Fragment to render React element child */}
                    <>
                        <Input className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border" 
                            placeholder="Add Tags!"
                            onKeyDown={(e) => handleInputKeyDown(e, field)}
                        />
                        {field.value.length > 0 && ( 
                            <div className="flex-start mt-2.5 gap-2.5">
                                {field.value.map((tag: any) => (
                                    <Badge 
                                        key={tag}
                                        className="subtle-medium background-light800_dark400 text-primary-500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                                        onClick={() => handleTagRemove(tag, field)}
                                    >

                                        {tag}
                                        <Image
                                            src='/assets/icons/close.svg'
                                            alt="Close icon"
                                            width={12}
                                            height={12}
                                            className="cursor-pointer object-contain invert-0 dark:invert"
                                        />
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </>
                    </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags that relates to your question. Press enter to add a tag.
            </FormDescription>
            <FormMessage className="text-red-500"/>
            </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        
  )
}

export default Question
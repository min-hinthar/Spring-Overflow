'use client'

import React, { useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { AnswerSchema } from '@/lib/validations';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';
import { POST } from '@/app/api/webhook/route';


interface Props {
    question: string,
    questionId: string,
    authorId: string
}

const Answer = ({ question, questionId, authorId }: Props) => {
    const pathname = usePathname();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [setIsSubmittingAI, setSetIsSubmittingAI] = useState(false)
    const { mode } = useTheme();
    // Tiny.Cloud.React Editor
    const editorRef = useRef(null);

    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            answer: ''
        }
    });

    const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
        setIsSubmitting(true);

        try {
            await createAnswer({
                content: values.answer,
                author: JSON.parse(authorId),
                question: JSON.parse(questionId),
                path: pathname,
            });

            form.reset();

            if(editorRef.current) {
                const editor = editorRef.current as any;

                editor.setContent('');
            }
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            setIsSubmitting(false)
        }
    }

    const generateAIanswer = async () => {
        if(!authorId) return;

        setSetIsSubmittingAI(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, {
                method: 'POST',
                body:  JSON.stringify({question}),

            })

            const aiAnswer = await response.json();

            alert(aiAnswer.reply)
            
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setSetIsSubmittingAI(false);
        }
    }

  return (
    <div>
        <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
            <h4 className='paragraph-semibold text-dark400_light800 mt-5'>
                Submit your response :
            </h4>
            <Button 
                className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 lg:mt-2 text-primary-500 shadow dark:text-primary-500'
                onClick={generateAIanswer}
            >
                <Image
                    src='/assets/icons/stars.svg'
                    alt='star'
                    width={12}
                    height={12}
                    className='object-contain'
                />
                Generate AI Answer
            </Button>
        </div>
        <Form {...form}>
            <form
                className='mt-6 flex w-full flex-col gap-10'
                onSubmit={form.handleSubmit(handleCreateAnswer)}
            >
                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-3">
                        <FormControl className="nt-3.5">
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                onInit={(evt, editor) => {
                                    // @ts-ignore
                                    editorRef.current = editor
                                }}
                                onBlur={field.onBlur}
                                onEditorChange={(content) => field.onChange(content)}
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
                                content_style: 'body { font-family:Inter; font-size:16px }',
                                skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                                content_css:  mode === 'dark' ? 'dark' : 'light',
                                }}
                            />

                        </FormControl>
                    <FormMessage className="text-red-500"/>
                    </FormItem>
                    )}
                />

                <div className='flex justify-end'>
                    <Button
                        type='submit'
                        className='primary-gradient w-fit text-dark'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default Answer
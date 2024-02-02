'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ProfileSchema } from "@/lib/validations"
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "@/lib/actions/user.action"

interface Props {
    clerkId: string,
    user: string,
}

const Profile = ({ clerkId, user }: Props) => {

    const parsedUser = JSON.parse(user);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // SHADCN Documentation

      // 1. Define your form.
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
        name: parsedUser.name || '',
        username: parsedUser.username || '',
        portfolioWebsite: parsedUser.portfolioWebsite || '',
        location: parsedUser.location || '',
        bio: parsedUser.bio || '',
        },
    })

      // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
        setIsSubmitting(true);

        try {
            // Update User Info
            await updateUser({
                clerkId,
                updateData: {
                    name: values.name,
                    username: values.username,
                    portfolioWebsite: values.portfolioWebsite,
                    location: values.location,
                    bio: values.bio,
                },
                path: pathname,
            });

            router.back();
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 flex w-full gap-9 flex-col">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="space-y-3.5">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Name <span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input 
                            className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                            placeholder="Your Name" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem className="space-y-3.5">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Username <span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input 
                            className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                            placeholder="Your Username" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="portfolioWebsite"
                render={({ field }) => (
                    <FormItem className="space-y-3.5">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Portfolio Link
                    </FormLabel>
                    <FormControl>
                        <Input
                            type="url"
                            className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                            placeholder="Your Portfolio URL" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem className="space-y-3.5">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Location
                    </FormLabel>
                    <FormControl>
                        <Input
                            className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                            placeholder="Where are you from?" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem className="space-y-3.5">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Bio
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                            placeholder="What's unique about you?" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

        <div className="mt-7 flex justify-end">
            <Button 
                type="submit"
                className="primary-gradient w-fit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </div>


        </form>
        </Form>
    )
}

export default Profile
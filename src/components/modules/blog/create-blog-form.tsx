'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from '@tanstack/react-form'
import z from 'zod'


const schema=z.object({
    title:z.string().min(1,'Title is required'),
    content:z.string().min(1,'Content is required')
})

export default function CreateBlogForm() {
const form = useForm({
    defaultValues:{
        title:'',
        content:'',
    },
    validators:{
        onChange:schema
    },
    onSubmit:async({value})=>{
        console.log(value)
    }
})



  return (
    <Card>
        <CardHeader>
            <CardTitle>Create Blog</CardTitle>
        </CardHeader>
        <CardContent>
            <form id='create-blog-form' onSubmit={(e)=>{
                e.preventDefault()
                 form.handleSubmit()
            }}>
             <FieldGroup>
                <form.Field name="title" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Title"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </>
                );
              }}/>
             </FieldGroup>

             <FieldGroup>
             <form.Field name="content" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <>
                    <FieldLabel htmlFor="content">Content</FieldLabel>
                    <Input
                      id="content"
                      type="text"
                      placeholder="Content"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </>
                );
              }}/>
             </FieldGroup>
             
            </form>
        </CardContent>
            <CardFooter>
                <Button form='create-blog-form' type='submit' className='w-full'>Create Blog</Button>
            </CardFooter>  
    </Card>
  )
}

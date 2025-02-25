"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm"
import { FormControl } from "@/components/ui/form"
import { RadioGroup } from "../ui/radio-group"
import { RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { GenderOptions } from "@/constants"
const RegisterForm =({user}:{user:User}) => {
       const router=useRouter();
     const [ isLoading , setIsLoading] =useState(false);  
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
     name: "",
     email:"",
     phone:"",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async ({name, email, phone}: z.infer<typeof UserFormValidation>) => {
       setIsLoading(true);
   
       try {
         const userData = {
           name,
           email,
           phone,
         };
   
         const newUser = await createUser(userData);
   
         if (newUser) {
           router.push(`/patients/${newUser.$id}/register`);
         }
       } catch (error) {
         console.log(error);
       }
   
       setIsLoading(false);
     };
   


return (
       <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">
       <section className=" space-y-4">
       <h1 className="header">Welcome 👋</h1>
       <p className="text-dark-700">Let us know more about yourself</p>
       </section>  
       <section className=" space-y-6">
        <div className="mb-9 space-y-1">
       <h2 className="sub-header">Personal Information</h2>
       </div>
       </section>  

       <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row ">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="email"
          placeholder="Johndoe@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
        />
         <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="phone number"
          placeholder="9889 9848 44"
         
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
         {/* <section className=" space-y-6">
        <div className="mb-9 space-y-1">
       <h2 className="sub-header">Medical Information</h2>
       </div>
       </section>  */}

       
        
         
        <SubmitButton isLoading ={isLoading}>Get started</SubmitButton> 
       </form>
     </Form>
)
}

export default RegisterForm

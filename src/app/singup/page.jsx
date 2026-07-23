"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { IconBase } from "react-icons";

const SingUpPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        // console.log(user);
        const { data, error } = await authClient.signUp.email(
            {
                name: user.name,
                email: user.email,
                image: user.image,
                password: user.password
            }
        );
        console.log(data, error);
        if (data) {
            redirect('/')
        }
        if (error) {
            alert(error.message)
        }
    }
    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })

    }
    return (
        <div className="max-w-[1280px] mx-auto">
            <Card className="rounded-none my-3">
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="name"
                        type="text"


                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter Your Name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="image"
                        type="url"


                    >
                        <Label>Image Url</Label>
                        <Input placeholder="Enter Image Url" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button className="rounded none w-full" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

                <div>
                    <div className="flex justify-center items-center gap-3">
                        <Separator />
                        <div className="whitespace-nowrap">
                            Or sing with
                        </div>
                        <Separator />
                    </div>
                    <div>
                        <Button onClick={handleGoogleSignin} className="w-full" variant="tertiary">
                            <IconBase icon="devicon:google" />
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </Card>

        </div>
    );
};

export default SingUpPage;
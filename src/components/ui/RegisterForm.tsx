import { Link } from "react-router";
import { Button } from "./button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/Auth/auth.api";
import { toast } from "sonner";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {


    const [register] = useRegisterMutation();

    const registerSchema = z.object({
        username: z.string().min(3, { error: "Username to be short" }).max(50),
        email: z.email({ error: "Invalid email formate" }),
        password: z.string().min(8, { error: "password to be short" }).max(50),
        confirmPassword: z.string().min(8, { error: "Confirm password to be short" }).max(50),
    }).refine((data) => data.password === data.confirmPassword, { message: "confirm password dosent match", path: ["confirmPassword"] })

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {

        const info = {
            name : data.username,
            email : data.email,
            password : data.confirmPassword
        }

        try {
            const res = await register(info).unwrap();
            console.log(res);
            toast.success("User registraction successfully");
        } catch (error) {
            console.log(error);
            toast.error("User registraction faild");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-6", className)}
                {...props}
            >

                {/* Title */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Register to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to register to your account
                    </p>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </div>

                {/* Divider */}
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>

                {/* Social login */}
                <Button variant="outline" className="w-full">
                    Login with GitHub
                </Button>

                {/* Footer */}
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link className="underline underline-offset-4" to={"/register"}>
                        SignUp
                    </Link>
                </div>
            </form>
        </Form>
    )
}
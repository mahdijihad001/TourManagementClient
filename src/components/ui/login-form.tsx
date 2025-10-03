import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { useForm } from "react-hook-form"
import { Input } from "./input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation } from "@/redux/features/Auth/auth.api"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.email({ error: "Invalid email formate" }),
  password: z.string().min(7, { error: "Password is to short" })
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [login] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);

    try {
      const res = await login(data).unwrap();
      console.log(res);
      toast.success("Login successfully.");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message)
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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

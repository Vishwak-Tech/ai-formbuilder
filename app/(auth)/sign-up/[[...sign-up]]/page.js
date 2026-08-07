import { SignUp } from '@clerk/nextjs'

export const metadata = {
  title: "Create Account",
  description:
    "Create your free FormCraft account and start building AI-powered forms in seconds.",
};

export default function Page() {
  return <SignUp path='/sign-up'/>
}


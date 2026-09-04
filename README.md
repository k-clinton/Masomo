This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact email setup

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` plus `HARNES_FROM_EMAIL`. The Resend key is read only by the server-side `/api/contact` route and must never use a `NEXT_PUBLIC_` prefix.

`HARNES_FROM_EMAIL` must be a sender address on a domain verified in Resend. For local testing, Resend's `onboarding@resend.dev` sender can deliver to the email address associated with your Resend account. Set `HARNES_CONTACT_EMAIL` to that address temporarily. In production, remove `HARNES_CONTACT_EMAIL` and set the verified sender; enquiries will then go to the business address in `src/data/site.ts` and use the visitor email as `Reply-To`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Running the app

- Make sure `pnpm` is installed
- `pnpm i`
- `pnpm run start`
- The app shows several cases (the one from the example, text with no marks, text with emoji, long text with marks at the beginning and end + consecutive sections with marks)
- A running version of the app is available at: https://home-task-nu.vercel.app

# Assumptions

- Additional information is shown on hover (doing it like in the screenshot would take considerably longer)
- Colors are assigned randomly on each page reload, based on the order of categories in the server response
- There are no more than five marks per range of text
- The marks in the server response are presorted, and "defragmented" (no partially overlapping marks)
- There are at most 50 of categories (this can be modified of course)
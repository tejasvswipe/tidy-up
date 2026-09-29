
# TidyUp

> A local-first reset tool for noisy brains and hard starts: turn mental clutter into one calm, visible next action.

TidyUp is a focused productivity web app for moments when planning feels harder than starting. It guides you through a short reset: choose how you are feeling, regulate or ground yourself, capture loose ends, select one tiny action, and protect the first few minutes with a timer.

## Features

- **State-matched starting points** — Choose Scattered, Anxious, Avoiding, or Just Start.
- **Guided RESET flow** — Regulate, Externalize, Select, Engage, and Transition.
- **Breathing and grounding options** — Use the 4/6 breathing prompt or the 5-4-3-2-1 senses-based alternative.
- **Loose-end capture** — Add multiple thoughts at once by placing each one on a new line.
- **One visible next action** — Turn an overwhelming task into a small, concrete first step.
- **Focus timer** — Choose a 5-, 15-, or 25-minute focus session.
- **Distraction parking** — Save distracting thoughts in a “Not now” note.
- **Reset history** — Track whether you Started, Partly started, or have Not started yet.
- **Curated video library** — Quickly open selected grounding, breathing, and body-doubling videos.
- **Local-first storage** — No account or sign-in is required.
- **Keyboard shortcuts** — Quickly navigate the app without relying only on the mouse.

## The RESET Method

TidyUp uses a five-step reset process:

1. **Regulate** — Lower the mental noise with breathing or grounding.
2. **Externalize** — Move open loops out of your head and into the inbox.
3. **Select** — Choose one task and define the smallest visible action.
4. **Engage** — Start a protected focus session.
5. **Transition** — Record what happened and decide what comes next.

> You do not have to finish everything. You only have to make the next move visible.

## Quick Start

### Requirements

- Node.js 20 or later
- pnpm 10 or later

### Installation

```bash
git clone https://github.com/tejasvswipe/tidy-up.git
cd tidy-up
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:3000
```

## Available Scripts

```bash
pnpm dev       # Start the development server
pnpm check     # Run the TypeScript type checker
pnpm build     # Create a production build
pnpm start     # Start the production server
pnpm preview   # Preview the production build
pnpm format    # Format the project with Prettier
```

## Suggested Demo Flow

1. Open TidyUp.
2. Select **SCATTERED**.
3. Click **START A 3-MINUTE RESET**.
4. Complete the breathing exercise or choose **USE 5-4-3-2-1**.
5. Paste multiple loose ends into the capture field.
6. Select one item from the inbox.
7. Rewrite it as one small visible action.
8. Choose a 5-, 15-, or 25-minute focus session.
9. Pause the timer and park a distraction.
10. Record whether you started.
11. Open the history or video library.

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `N` | Focus the loose-end capture field |
| `R` | Start a reset |
| `?` or `Shift + /` | Open keyboard help |
| `Esc` | Close open overlays |

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Wouter
- Lucide React
- Sonner
- Express
- pnpm

## Project Structure

```text
.
├── client/
│   ├── index.html
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx
│       │   └── NotFound.tsx
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── index.css
│       └── main.tsx
├── server/
│   └── index.ts
├── shared/
├── PRD.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## Data and Privacy

TidyUp currently stores loose ends and reset history locally in the browser using `localStorage`.

No account or backend database is required for the main experience.

You can clear locally stored data using the **CLEAR LOCAL DATA** option in the app.

## Important Note

TidyUp is a self-guided focus and grounding tool, **not medical care**.

It does not diagnose or treat anxiety, ADHD, depression, or any other medical condition. If a breathing exercise feels uncomfortable, use the senses-based grounding alternative instead.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Install dependencies with `pnpm install`.
4. Make your changes.
5. Run:

```bash
pnpm check
pnpm build
```

6. Open a pull request describing the change.

## License

The project is declared as MIT-licensed in `package.json`.
```
# TidyUp — Product Requirements Document

**Document status:** Draft for implementation  
**Product type:** Single-user web app  
**Working title:** TidyUp  
**Primary promise:** When your brain feels noisy, TidyUp gives you one calm, concrete next step in under three minutes.

## 1. Product Summary

TidyUp is a focused reset tool for people who feel anxious, mentally scattered, or stuck in procrastination. It is not a general task manager and it is not a mental-health diagnosis tool. It is a short guided sequence that helps a user regulate their attention, name what is creating friction, choose one tiny action, and begin with a timed focus session.

The product should feel like a calm operating system for a difficult moment. It should reduce decision-making rather than add another dashboard to maintain.

The first release is client-only and stores the user’s queue and preferences locally in the browser. It should work without sign-up, account creation, or a backend.

## 2. Problem

A user who is anxious or procrastinating often has three problems at the same time:

1. Their nervous system is activated, so ordinary planning feels harder.
2. Their open loops are not externalized, so everything feels equally urgent.
3. The first action is vague, too large, or emotionally uncomfortable, so starting is delayed.

Existing productivity tools usually begin with a blank task list. That assumes the user already has enough calm and executive function to plan. TidyUp must begin earlier: it should first lower friction, then convert the problem into a visible next action.

## 3. Goals and Non-goals

### Goals

TidyUp must help a user:

- Move from anxious or scattered to slightly more grounded.
- Capture loose ends without organizing them immediately.
- Select one next action that is small enough to start now.
- Begin a short focus block with a clear stopping point.
- Close the loop by recording what happened and choosing the next reset time.
- Discover a small, curated set of high-signal YouTube resources without falling into recommendation-feed browsing.

### Non-goals

TidyUp will not diagnose anxiety, ADHD, depression, or any other condition. It will not claim to treat a mental-health condition. It will not replace professional care. It will not attempt to optimize a user’s entire calendar, manage projects, or rank their personal worth by completed tasks.

## 4. Target Users

The primary user is a student, knowledge worker, freelancer, or business owner who periodically loses momentum because of overwhelm, anxiety, overthinking, or task ambiguity.

The secondary user is someone who wants a repeatable five-to-fifteen-minute reset ritual instead of an elaborate productivity system.

The product should support users who do not identify with ADHD or anxiety language. Use plain wording such as “stuck,” “noisy,” “overloaded,” and “hard to start,” while allowing the user to select the state that best matches their current moment.

## 5. The Core Method: RESET

The app’s exact method is a five-step sequence called **RESET**. The sequence is intentionally short and always ends in behavior, not just reflection.

> **RESET = Regulate → Externalize → Select → Engage → Transition**

A complete RESET should take between 3 and 32 minutes depending on the selected mode.

### Step 1: Regulate — 60 to 120 seconds

Purpose: Reduce activation enough to make a choice. The app must never imply that one breathing exercise will “cure” anxiety.

Default instruction:

1. Put both feet on the floor or notice the surface supporting you.
2. Relax the jaw and lower the shoulders.
3. Inhale gently for 4 seconds.
4. Exhale slowly for 6 seconds.
5. Repeat for 6 rounds.
6. On the final exhale, look at one object in the room and name it silently.

The interface should show a simple animated ring and a “skip breathing” option. If breathing feels uncomfortable, the user should be offered a non-breathing grounding alternative: name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste or appreciate.

### Step 2: Externalize — 60 seconds

Purpose: Move open loops out of working memory.

The user sees one large input with the prompt: **“What is taking up space in your head?”**

They can paste or type multiple thoughts separated by new lines. The app must not force categorization at this stage. Each line becomes a loose end. Suggested examples should be concrete: “reply to Sam,” “start the report,” “book dentist,” or “clean the desk.”

The app should also support a keyboard shortcut, `N`, that opens the capture field from the home screen.

### Step 3: Select — 30 to 60 seconds

Purpose: Choose one action that is urgent enough to matter and small enough to begin.

The app should display the captured loose ends as cards. The user selects one card and answers one question:

**“What is the smallest visible action that moves this forward?”**

If the user types a vague action such as “work on report,” the app should suggest a smaller rewrite such as “open the report and write the three section headings.” The user can accept, edit, or skip the suggestion.

The app should offer three selection shortcuts:

- **Now:** I can start this in the next 2 minutes.
- **Later:** Important, but not for this reset.
- **Release:** Not mine, not necessary, or not actionable today.

Only one item can be in the Now lane at a time. This prevents the product from recreating the user’s original overload.

### Step 4: Engage — 5, 15, or 25 minutes

Purpose: Turn intention into a protected start.

The user chooses a focus length. The default is 5 minutes because the first win is starting. The app then shows:

- The single action in large type.
- A countdown timer.
- A “make it smaller” button.
- A “pause and reset” button.
- A distraction note field labelled “Not now — remember this.”

When the timer starts, the app should suppress other interface choices. The goal is not to provide more planning. It is to make the current action visually unavoidable.

Optional mode: **Quiet company**, which opens a selected YouTube body-doubling or focus video in a new tab while the TidyUp timer remains visible. The app must warn the user that YouTube recommendations can become distracting and should be used only with a preselected video.

### Step 5: Transition — 30 seconds

Purpose: Close the loop without demanding a full review.

At the end of the timer, ask three lightweight questions:

1. **Did you start?** Yes / Partly / Not yet.
2. **What is the next visible action?** One short text field.
3. **When should TidyUp remind you to reset?** Later today / Tomorrow / No reminder.

The success state should celebrate starting, not only completion. “You kept the promise to begin” is preferable to “Task completed” when the user selected Partly.

## 6. Three Major Quality-of-Life Improvements

### Improvement 1: State-matched reset instead of a blank task list

TidyUp asks how the user feels before asking what they need to do. If the user selects “anxious,” it leads with grounding. If the user selects “scattered,” it leads with capture. If the user selects “avoiding,” it leads with a two-minute starter action. This removes the need to decide which productivity technique to use.

### Improvement 2: One-action constraint instead of an infinite queue

The app allows unlimited capture but only one active Now action. Everything else is safely parked in Later or Release. This protects attention and prevents the common failure mode where planning becomes another form of procrastination.

### Improvement 3: Preselected video support instead of algorithmic browsing

TidyUp provides a small library of intentionally selected videos by use case and duration. It launches the chosen video directly rather than embedding an infinite recommendation surface. The product turns “find something calming” from a 20-minute search into a one-click choice.

## 7. YouTube Resource Library

The first release should ship with a curated library of 6 to 9 videos. The library should be reviewed before launch, and links should be rechecked periodically because availability, titles, and creator content can change.

The product should show duration, use case, and a short neutral description. It should not make medical claims about any video.

| Use case | Video | Duration | Product label | Link |
|---|---|---:|---|---|
| Fast calming | Calm Stress & Anxiety \| 2 Minute 4-6 Breathing | 2:37 | “Six slow 4-in / 6-out cycles” | [Open video](https://www.youtube.com/watch?v=YinB9cn3VL0) |
| Grounding | The 5-4-3-2-1 Method: A Grounding Exercise to Manage Anxiety | 4:28 | “Reconnect with the room using your senses” | [Open video](https://www.youtube.com/watch?v=30VMIEmA114) |
| Focus start | Pomodoro Timer Body Doubling! | 1:41:48 | “Quiet company for a longer work block” | [Open video](https://www.youtube.com/watch?v=wnwTVlPRJaA) |
| Grounding alternative | This Grounding Technique Stops Anxious Thoughts Immediately | 5:28 | “A guided grounding option when breathing is not comfortable” | [Open video](https://www.youtube.com/watch?v=q_L_DiqoRn4) |
| Body release | Progressive Muscle Relaxation - Simple Guided Calming Exercise for Beginners | 5:55 | “Release tension by gently tensing and relaxing muscles” | [Open video](https://www.youtube.com/watch?v=Z21Xslddz3Y) |
| Cognitive reset | 4 Types of Overthinking and How to Stop Them | 19:51 | “Understand the loop, then return to one action” | [Open video](https://www.youtube.com/watch?v=28BkdLXQA-c) |

The library should default to the shortest appropriate video. The user should never see more than three recommendations at once: one fast reset, one grounding alternative, and one focus companion. A “view all” control can reveal the remainder.

The app should include a lightweight “report link” action so a user can flag a video that is unavailable, misleading, overly intense, or distracting. The first release can store this report locally or simply open an email link.

## 8. Home Screen Requirements

The home screen should answer three questions immediately:

1. **How are you arriving?** Choose Calm / Scattered / Anxious / Avoiding / Just need a start.
2. **What is the next helpful move?** Show one recommended RESET path.
3. **Can I begin now?** Provide a prominent “Start 3-minute reset” action.

Recommended desktop layout:

- Left rail: TidyUp identity, Today, History, Video library, and keyboard shortcut hint.
- Main column: state check-in, recommended reset card, and active action.
- Right column: “Loose ends” capture and a small “You started” progress history.

On mobile, collapse the rail into a top bar and stack the main actions in this order: state check-in, recommended reset, capture, active action.

## 9. Functional Requirements

### Capture and queue

The user can add, edit, complete, park, release, and delete loose ends. New items are saved to local storage immediately. The user can paste multiple lines to create multiple items.

### Reset flow

The flow must preserve progress if the browser is refreshed. The user can go back one step, but the app should discourage unnecessary backtracking during the Engage step.

### Timer

The timer must support 5, 15, and 25 minutes. It should continue accurately when the tab is backgrounded by calculating remaining time from timestamps rather than decrementing only on visible intervals. The app should show a completion notification within the page and use the browser Notification API only after explicit permission.

### Local persistence

Persist the following locally: loose ends, active reset step, selected state, completed reset count, selected video preferences, and the last seven days of lightweight history. Provide a “Clear local data” control in settings with an explicit second click.

### Keyboard support

Required shortcuts:

- `N`: open capture.
- `R`: start a reset.
- `Space`: pause or resume the timer when the timer is focused.
- `Esc`: close a modal or return to the current step.

The app must display shortcuts in a small help panel and never rely on shortcuts as the only route to an action.

### Accessibility

Use visible focus styles, semantic buttons, labelled inputs, keyboard navigation, sufficient color contrast, and reduced-motion support. Never use color alone to indicate state. Timer updates must be announced accessibly without causing repeated screen-reader noise.

## 10. Safety and Trust Requirements

TidyUp must include a short footer note: **“TidyUp is a self-guided focus and grounding tool, not medical care.”**

If the user chooses “I feel unsafe,” “I might hurt myself,” or a similar high-risk option in a future expansion, the app must stop the productivity flow and show a crisis-support message appropriate to the user’s country. The first release should not pretend to handle crisis triage without a proper support-content plan.

The app must avoid claims such as “this will stop anxiety,” “this fixes ADHD,” or “this guarantees productivity.” Use language such as “may help you settle,” “can make starting easier,” and “try this next.”

Breathing content must always include a non-breathing alternative because some users experience discomfort or panic when focusing on breath.

## 11. Metrics for the First Release

Because this is a local-first prototype, metrics should be visible to the user rather than sent to a third-party analytics service by default.

Track locally:

- Number of resets started.
- Number of resets completed or partly completed.
- Number of times a user reaches the Engage step.
- Number of sessions where the user records “started.”
- Most frequently selected state.
- Most frequently selected reset duration.

The key product signal is **reset-to-start rate**: the percentage of started resets in which the user records that they began the chosen action.

## 12. MVP Acceptance Criteria

The MVP is ready for demonstration when all of the following are true:

1. A user can arrive on the home screen and start a guided reset without signing in.
2. The RESET method is visible and understandable without external instructions.
3. The user can complete the Regulate, Externalize, Select, Engage, and Transition steps.
4. The app keeps exactly one active Now action.
5. The 5-minute timer remains accurate if the tab is temporarily backgrounded.
6. The user can add several loose ends by pasting multiple lines.
7. The app persists data after refresh.
8. At least six curated YouTube resources are available with duration and use-case labels.
9. The app offers a non-breathing grounding path.
10. The app works on desktop and mobile widths.
11. The interface has visible focus states and respects reduced-motion preferences.
12. A user can reset local data from settings.

## 13. Demo Script for Reviewers

The reviewer should be able to understand the value in under two minutes:

1. Open TidyUp and select **Scattered**.
2. Click **Start 3-minute reset**.
3. Complete the short breathing or grounding step.
4. Paste three loose ends into the capture field.
5. Select one item and turn it into a tiny visible action.
6. Start the 5-minute timer.
7. Pause the timer, add a distraction note, and resume it.
8. Finish or skip to the transition state and record “Started.”
9. Refresh the browser and confirm that the queue remains.
10. Open the video library and launch the preselected body-doubling video in a new tab.

The reviewer should leave with a clear understanding that TidyUp reduces three kinds of friction: emotional activation, mental clutter, and task-start ambiguity.

## 14. Future Improvements

After validating the MVP, consider adding optional calendar reminders, user-created video collections, a browser extension for one-click capture, a trusted-person body-doubling invitation, and an exportable weekly reflection. These features should be evaluated against the central constraint: TidyUp must remain a reset tool, not become another system the user has to maintain.

## References

[1]: https://www.mayoclinic.org/tests-procedures/meditation/in-depth/mindfulness-exercises/art-20046356 "Mayo Clinic: Mindfulness exercises"
[2]: https://add.org/the-body-double/ "ADDA: The ADHD Body Double: A Unique Tool for Getting Things Done"
[3]: https://www.youtube.com/watch?v=YinB9cn3VL0 "Calm Stress & Anxiety | 2 Minute 4-6 Breathing"
[4]: https://www.youtube.com/watch?v=30VMIEmA114 "The 5-4-3-2-1 Method: A Grounding Exercise to Manage Anxiety"
[5]: https://www.youtube.com/watch?v=wnwTVlPRJaA "Pomodoro Timer Body Doubling!"
[6]: https://www.youtube.com/watch?v=q_L_DiqoRn4 "This Grounding Technique Stops Anxious Thoughts Immediately"
[7]: https://www.youtube.com/watch?v=Z21Xslddz3Y "Progressive Muscle Relaxation - Simple Guided Calming Exercise for Beginners"
[8]: https://www.youtube.com/watch?v=28BkdLXQA-c "4 Types of Overthinking and How to Stop Them"

## Appendix: Product Language Examples

Prefer: **“Let’s make the next step smaller.”**  
Avoid: “Stop being lazy.”

Prefer: **“You do not have to finish. You only have to begin.”**  
Avoid: “You can finish anything if you try hard enough.”

Prefer: **“If breathing feels uncomfortable, use the senses-based grounding option.”**  
Avoid: “Just take a deep breath.”

Prefer: **“Started is a valid outcome.”**  
Avoid: “You failed to complete the task.”

![Detailed Show View Screenshot](/public/detailed-show-view.png)
_Detailed view of a selected TV show with information including metadata and seasons list._

# TV Maze Project Research

## Objective

**TV show dashboard** that effectively categorizes and displays shows based on their genre. You are expected to create an intuitive and user-friendly UI where TV shows are not only grouped by genre but also sorted according to their ratings. When a user selects a particular show from the dashboard, they should be redirected to a detailed screen that provides comprehensive information about the show. To enhance user experience, a search feature should also be implemented allowing users to look up tv shows by name.

## Outline

### 1. Setup & Initial Research 🧑‍💻

- ✅ **TVMaze API:** Familiarize with the API and available endpoints.
  - [Filtering and Sorting Limitations in the TVMaze API](/api.md)
- ✅ **UI Patterns:** Research common TV app UI patterns, focusing on navigation and presentation (e.g., horizontal lists, focus management).
  - [Designing for Television – TV Ui design](https://marvelapp.com/blog/designing-for-television/)
  - [How to Create a UI Design for Smart TVs: 7 Tried & Tested Tips](https://www.purrweb.com/blog/how-to-design-an-app-for-smart-tvs/)

### 2. Core Features ⚙️

- ✅ **Horizontal Lists of TV Shows:**
  1. Group shows by genre (Drama, Comedy, etc.).
  2. Sort by ratings.
- ✅ **Search Feature:** Allow users to search for shows by name.
- ✅ **Detailed Show View:** Display detailed information for a selected show (overview, ~~cast~~, ~~episode list~~, etc.).

> **Update.** Since show browsing has a lot of records (initial `pageSize` is set to 20, but user should be able to get more records with eg. _load more_ or _pagination_ functionality), for better UX it is suggested to switch from **horizontal list** UI pattern to **grid** layout.

### 3. UI & UX Design 🎨

- ✅ **Mobile-First Design:** Design with mobile in mind, then adapt for desktop and TV.
- ⏳ **Focus on Accessibility:**
  1. **ARIA Attributes:** Ensure proper use of ARIA attributes (like aria-label, aria-labelledby, aria-describedby) to improve screen reader support and navigation.
  2. **Keyboard Navigation:**
     Implement proper focus management for keyboard (and remote) navigation, including focus indicators for interactive elements.
     Ensure users can navigate through horizontal lists with arrow keys and interact with buttons, links, and other elements easily.
     Handle focus properly when elements appear/disappear or when switching between views.

### 4. State Management & Data Handling 💾

- ✅ **Vue's Reactivity:** Handle state using Vue's reactivity system.
- ✅ **On-Demand API Fetching:** Fetch TV show data when needed (minimize load time).
- ❌ **Local Storage:** Cache relevant data to avoid redundant API requests.

### 5. User Navigation 🔄

- ❌ **Arrow Key Navigation:** Enable smooth scrolling in horizontal lists using arrow keys.
- ✅ **Focus Management:** Highlight focused items and ensure proper accessibility for TV screens.

### 6. Animations & Interactions ✨

- ✅ **Basic Animations:** Implement basic transition effects (e.g., fade, scale) using Vue’s transition system and Tailwind classes.

> **Update.** Vue page-transitions implemented

### 7. Testing & Iteration 🧪

- ⏳ **User Testing:** Ensure the app works well on mobile, desktop, and TV.
- ✅ **Automated Testing:** Implement E2E tests to assert the business flows.
  > **Update.** Unit-tests implemented with `vitest`

## BDD (Behavior-Driven Development)

### 1. Goal 🎯

Focus on BDD to define clear behaviors for the app, ensuring that all scenarios are well-defined and tested. I'll write scenarios in Gherkin syntax, outline user stories, and create automated E2E tests to verify that the application functions as expected.

### 2. Structure 🏗

- Given: The initial state or context.
- When: The action or event that takes place.
- Then: The expected outcome or behavior.

### 3. Example Scenarios 🎭

- **Scenario:** Viewing TV Shows by Genre

  - **Given** a user is on the homepage of the TV Maze App
  - **When** the user scrolls horizontally through the "Drama" genre
  - **Then** they should see a list of drama shows sorted by ratings

## Appendix: Key Highlights

### Tech Stack 🔧

- **Backend:** `H3`, `PostgreSQL`
- **Frontend:** `Vue.js`, `Tailwind CSS`, `vueuse`
- **State Management:** Vue’s reactivity, LocalStorage
- **API:** TV Maze API `proxy` and internal API
- **Animations:** Vue Transition, Tailwind CSS
- **Testing:** `Cypress`, `Cucumber`, `vitest`
- **Services:** `Supabase`, `Cloudflare`

### Key Features 🚀

- ~~Horizontal lists~~ Grid of TV shows grouped by genre
- Sorting by ratings
- Search functionality
- Detailed show view with ~~episode~~ seasons list, `cast`, etc.
- Accessibility features for remote navigation (focus management, arrow key navigation)

## References

### Docs 📚

- [Vue.js](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [vueuse](https://vueuse.org/)

### UI inspiration 🔗

- [Movie details View](https://dribbble.com/shots/6381117-VUE-Cinema-detail-page)
- [TV App with Voice Search](https://dribbble.com/shots/16778895-Smart-TV-App)
- [Satellite Live TV View](https://dribbble.com/shots/24443121-Receiver-Satellite-Live-TV)

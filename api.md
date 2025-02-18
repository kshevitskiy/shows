# Filtering and Sorting Limitations in the TVMaze API

> The goal is to efficiently retrieve shows by genre and sort them by rating while supporting pagination. The solution should minimize redundant API requests and optimize performance.

## Issue with TVMaze API:

The TVMaze API lacks built-in support for filtering shows by genre and sorting them by rating in a single request. The `/shows` endpoint paginates results across 300+ pages (500 objects per page), making it inefficient to fetch and process all shows on the frontend.

### Use-case: Inefficient Sorting:

Sorting **~80,000** shows by rating using the TVMaze API is highly inefficient because the `/shows` endpoint only returns paginated results in their default order. To achieve proper sorting, the entire dataset must be fetched from **330+ pages** before sorting can even begin. This would result in excessive API requests, slow response times, and potential rate-limiting issues. Sorting on the frontend would require loading massive amounts of data into memory, leading to poor performance and a bad user experience.

## Possible Solutions:

1. Frontend Filtering and Sorting:

   - **Pros:** Simple to implement; no backend infrastructure required.
   - **Cons:** Not scalable; requires fetching all pages (80k+ shows) before filtering and sorting, leading to performance issues.

2. Backend Proxy API with Caching (e.g., Nest.js/H3 + Cloudflare Worker):

   - **Pros:** Enables efficient filtering and sorting before sending results to the frontend; caching reduces redundant API calls.
   - **Cons:** Still depends on TVMaze API limits; requires handling data freshness and cache invalidation.

3. ✅ Data sync to database, server-side filtering and sorting:

   - **Pros:** Allows efficient SQL queries for filtering/sorting; decouples from TVMaze API limitations; supports pagination and indexing.
   - **Cons:** Requires periodic syncing to ensure up-to-date data; adds database management overhead.
     For scalability and efficiency, a backend solution with caching or database syncing is preferable. If real-time updates aren’t critical, syncing TVMaze data to database and querying via SQL would provide the best performance.

> For scalability and efficiency, a **backend solution** with **caching** or database syncing is preferable. If real-time updates aren’t critical, syncing TVMaze data to DB and querying via SQL would provide the best performance.

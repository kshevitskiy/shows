# Filtering and Sorting Limitations in the TVMaze API

> The goal is to efficiently retrieve shows by genre and sort them by rating while supporting pagination. The solution should minimize redundant API requests and optimize performance.

**TVMaze API: Show index**

```text
A list of all shows in our database, with all primary information included. You can use this endpoint for example if you want to build a local cache of all shows contained in the TVmaze database. This endpoint is paginated, with a maximum of 250 results per page. The pagination is based on show ID, e.g. page 0 will contain shows with IDs between 0 and 250. This means a single page might contain less than 250 results, in case of deletions, but it also guarantees that deletions won't cause shuffling in the page numbering for other shows

Because of this, you can implement a daily/weekly sync simply by starting at the page number where you last left off, and be sure you won't skip over any entries. For example, if the last show in your local cache has an ID of 1800, you would start the re-sync at page number floor(1800/250) = 7. After this, simply increment the page number by 1 until you receive a HTTP 404 response code, which indicates that you've reached the end of the list.

As opposed to the other endpoints, results from the show index are cached for up to 24 hours.
```

## Issue with TVMaze API:

The TVMaze API lacks built-in support for filtering shows by genre and sorting them by rating in a single request. The `/shows` endpoint paginates results across 300+ pages (~250 objects per page), making it inefficient to fetch and process all shows on the frontend.

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

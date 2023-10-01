<script lang="ts">
  import { Timeline, TimelineItem, Button } from "flowbite-svelte";
</script>

<article class="flex flex-col items-start lg:w-2/4 w-3/4 mx-auto mt-5 pb-10">
  <h1 class="h1 mb-4">Storage</h1>

  <section class="mt-6">
    <p>
      We store your data in a secure database. We do not share your data with any third
      party. We do not sell your data. We do not use your data for any purpose other than
      providing you with the best possible experience.
    </p>
  </section>
  <section class="mt-8">
    <Timeline>
      <TimelineItem title="Knbn.zip is released" date="July 2023">
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          knbn.zip is released using redis as a database to store data.
        </p>
      </TimelineItem>
      <TimelineItem title="Security update" date="October 2023">
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          Redis is configured to store data in an index-based manner.
        </p>
      </TimelineItem>
    </Timeline>
  </section>
</article>

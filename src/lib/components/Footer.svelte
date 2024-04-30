<script lang='ts'>
    import { DateTime } from "luxon";
	import { onMount } from "svelte";

    function calculateRelativeTime() {
        const now = DateTime.utc();
        const nextDraw = now.set({hour: 0, minute: 0, second: 0, millisecond: 0}).plus({days: 1});
        return nextDraw.toRelative({base: now, unit: ["days", "hours", "minutes"]});
    }

    $: relativeTime = calculateRelativeTime();
    
    onMount(() => {
        const interval = setInterval(() => {
            relativeTime = calculateRelativeTime();
        }, 60000);
        
        return () => clearInterval(interval);
    });
</script>

<div class="flex">
    <div class="flex w-1/2">
        <p class="ml-1"> Next draw {relativeTime}</p>
    </div>
    <div class="flex w-1/2 justify-end">
        <p class="mx-1"> marlinspike_dev </p>
    </div>
</div>
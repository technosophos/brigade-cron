const { events, Job } = require("brigadier");

events.on("cron", (e, p) => {
  console.log(`Payload: ${e.payload}`);
  console.log(`Commit: ${e.revision.commit}`);
  console.log(`Ref: ${e.revision.ref}`);
});

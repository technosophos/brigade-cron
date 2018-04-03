# Brigade Cron: A cron gateway for Brigade

This is a gateway for [Brigade](https://brigade.sh). It provides a Brigade
user with the ability to schedule a specific Brigade job for a specific project.

## Usage

- Clone this repository
- `helm inspect values ./charts/brigade-cron > values.yaml`
- Edit `values.yaml`
- `helm install -n my-brigade-cron ./charts/brigade-cron -f values.yaml`

You can take a look in the `example/` directory for an example.

## Description

This project creates one CronJob which triggers one particular event for a particular
project. You can safely install many of these into the same cluster for the
same project. You can think of this as a crontab entry.

### Cron Time Format

You can determine how frequently your Cron runs by using the `schedule:` field.

> Note that the _cluster time_ is the time used. Not your local time.

The Cron time format is determined by Kubernetes itself. But the format is described
in detail in the [Wikipedia Cron page](https://en.wikipedia.org/wiki/Cron)

There are a few keyword entries: `@hourly`, `@daily`, `@weekly`, `@monthly`, `@yearly`.
Each of these fires at the beginning of the time period (top of the hour, beginning
of the day, first of the week, and so on).

In addition to the keywords, the Vixie Cron format is supported:

```
MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK
```

For example, to run every hour, use:

```
0 0 * * *
```

This implementation also supports some of the advanced behaviors. For example, to
run every five minutes, you can do:

```
*/5 * * * *
```

I have not tested more advanced things like:

```
1 23 * JAN MON-WED
```

The above _should_ run the job at 11:01 PM every Mon, Tue, and Wed in January.
But again, it is untested.


### Projects

This gateway will work with any existing Brigade project. If you have the Brig
client installed, you can see your Brigade projects like this:

```console
$ brig project list
NAME                     	ID                                                            	REPO
deis/test-private-testbed	brigade-544b459e6ad7267e7791c4f77bfd1722a15e305a22cf9d3c60c5be	github.com/deis/test-private-testbed
deis/empty-testbed       	brigade-830c16d4aaf6f5490937ad719afd8490a5bcbef064d397411043ac	github.com/deis/empty-testbed
```

You can use either the `NAME` or `ID` in your `brigade-cron` configuration.

### Events

The Brigade-Cron gateway does not define its own event (though we give examples
of using a `cron` event).

Essentially, you can use any event you want. You just need to make sure that the
event in your config file matches the event you want to fire in the `brigade.js`
file.

For example, you can configure `brigade-cron` with a `values.yaml` file like this:

```yaml
event: "my_event"

schedule: "@hourly"
project: "technosophos/brigade-cron"
ref: "refs/heads/master"
payload: "HELLO"

# You might need to override this.
rbac:
  enabled: false

image:
  registry: deis
  name: brig
  tag: latest
```

In the above, the `event` is set to `my_event`. To handle that event in a `brigade.js`,
you can do this:

```javascript
const { events } = require("brigadier");

events.on("my_event", (e, project) => {
  console.log("Hello!");
});

```

You can trigger any event this way. Note, however, that some events will expect
certain data in the `e.payload`. The expectations are entirely related to the
`brigade.js` file, though. Brigade itself does not care about the payload.

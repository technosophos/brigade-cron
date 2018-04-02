# Brigade-Cron Example

This is an example that uses this repository.

Clone this repository and then:

```
$ cd example
$ helm install -n technosophos-brigade-cron brigade/brigade-project -f project.yaml
$ helm install -n brigade-cron-example ../charts/brigade-cron -f values.yaml
```

If your cluster has RBAC turned on, add `--set rbac.enabled=true` at the end of the
second install:

```
$ helm install -n brigade-cron-example ../charts/brigade-cron -f values.yaml --set rbac.enabled=true
```

Now, the `brigade.js` in this repository will run every hour.

# Brigade Cron: A cron gateway for Brigade

This is a gateway for [Brigade](https://brigade.sh). It provides a Brigade
user with the ability to schedule a specific Brigade job for a specific project.

## Usage

- Clone this repository
- `helm inspect values ./charts/brigade-cron > values.yaml`
- Edit `values.yaml`
- `helm install -n my-brigade-cron ./charts/brigade-cron -f values.yaml`

## Description

This project creates one CronJob which triggers one particular event for a particular
project. You can safely install many of these into the same cluster for the
same project. You can think of this as a crontab entry.



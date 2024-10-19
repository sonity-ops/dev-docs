# How Does it Work?

The Webhooks microservice in these stage

## Step 1: Subscriptions

It subscribes to  [Postgres Event Triggers](https://www.postgresql.org/docs/current/event-triggers.html) and when it recieves data ot calls the `handleEvent` callback

### Files
- Subscribe Events -> `src/app.js`
- Handle Event     -> `src/utils/events.utils.js`


## Step 2: Process Event
In this step or statge the payload is checked, processed/formatted before sending to their destination webhooks


### Structure of the event payload
The payload is a `JSON` data striucture which these fields

- `payload.data.type` -> Type of event
- `payload.data.data` -> Event data


## Step 3: Recieving data and processing it
Note this step is not done  by the Microservice but i thought its worth mentioning

The destination recieves the data and use the data according to their needs.

This involves but not limited to:
- Anaytics
- Further cleaning & Processing
- Follow ups
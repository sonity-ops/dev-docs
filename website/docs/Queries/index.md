
# Queries



## All Sonity First Connections

```sql
--AllSonityFCs
select 
  fc.initiator_l_id AS partner_lid, 
  fc.acceptor_l_id AS lid, 
  concat(
    'https://linkedin.com/in/', fc.acceptor_l_id
  ) AS url, 
  p.profile_name, 
  null as cleaned_name, 
  null as cleaned_first_name, 
  null as cleaned_middle_name, 
  null as cleaned_last_name, 
  coalesce(c.email, em.email) as email, 
  coalesce(c.phone, ph.phone_num :: text) as phone, 
  null AS cleaned_phone, 
  p.profile_current_position AS position, 
  coalesce(c.company, p.profile_company) AS company, 
  coalesce(
    concat(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location AS location, 
  --cd.name,       
  --cs.status_label AS status_label,       
  coalesce(
    fc.connection_date, fc.created_at
  ) AS connection_date 
from 
  first_connections fc 
  inner join contacts spc on spc.l_id = fc.initiator_l_id 
  inner join sonity_profiles sp on sp.contact_id = spc.id 
  inner join contacts c on c.l_id = fc.acceptor_l_id 
  inner join prospects p on c.prospect_id = p.id 
  LEFT JOIN "LI_historic_data".emails em ON em.l_id = fc.acceptor_l_id 
  LEFT JOIN "LI_historic_data".phone_nums ph ON ph.l_id = fc.acceptor_l_id 
WHERE 
  fc.initiator_l_id IN (
    'pearcekyle', 'alex-briganti-cpa-bb986820a', 
    'bradley-perco-cpa-ca-555b52203', 
    'chris-munn-2a3116201', 'gord-berger-life-tot-tep-7a618b1b0', 
    'igor-ivanisevic-ca-cpa-b1ba641ba', 
    'kevin-k-mouscos-cpa-3a842a1b1', 
    'marcus-a-guenther-mba-cpa-ca-296270196', 
    'nada-boutarieh-kamaleddine-cpa-cga-a71858191', 
    'stevenk@corporateadvisors.ca', 
    'lisijie.xu@corporateadvisors.ca', 
    'caroline-ann-lock-37446a211', 
    'stevenk.linkedin@corporateadvisors.ca', 
    'steven-r-kark-9a24b8177', 'j-benjamin-de-leon-40390b212', 
    'robert-bob-blizzard-19a4b1268', 
    'maria-cruz-786200230', 'paul-black-p-eng-0a611919', 
    'pearcekyle', 'petrie-aucamp-cma-831254215'
  ) 
order by 
  connection_date, 
  partner_lid desc nulls last

```


## Pulling blacklisted

```sql
-- pulling blacklisted names w/ info fcs joined, query retrieves the specified fields along with the "profile_name"-- from the blacklisted_names table and ensures that only entries with a matching "profile_name" are included in the result
SELECT 
  fc.initiator_l_id as partner_lid, 
  fc.acceptor_l_id as lid, 
  'https://linkedin.com/in/' || fc.acceptor_l_id as url, 
  p.profile_name, 
  c.email, 
  c.phone, 
  NULL as cleaned_phone, 
  p.profile_current_position as position, 
  COALESCE(c.company, p.profile_company) as company, 
  COALESCE(
    CONCAT(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location as locationFROM first_connections fc 
  INNER JOIN contacts c ON fc.acceptor_l_id = c.l_id 
  INNER JOIN prospects p ON c.prospect_id = p.id 
  LEFT JOIN blacklisted_names b ON p.profile_name = b.profile_nameWHERE fc.initiator_l_id IN (
    'alex-briganti-cpa-bb986820a', 'bradley-perco-cpa-ca-555b52203', 
    'chris-munn-2a3116201', 'gord-berger-life-tot-tep-7a618b1b0', 
    'igor-ivanisevic-ca-cpa-b1ba641ba', 
    'kevin-k-mouscos-cpa-3a842a1b1', 
    'marcus-a-guenther-mba-cpa-ca-296270196', 
    'nada-boutarieh-kamaleddine-cpa-cga-a71858191', 
    'stevenk@corporateadvisors.ca', 
    'lisijie.xu@corporateadvisors.ca'
  ) 
  AND b.profile_name IS NOT NULL;
```

## All In Campaign Contacts

```sql
--all in campaign contacts
SELECT 
  'steven-r-kark-9a24b8177' as partner_l_id, 
  c.l_id as lid, 
  concat(
    'https://linkedin.com/in/', c.l_id
  ) as url, 
  p.profile_name as profile_name, 
  null as cleaned_name, 
  null as cleaned_first_name, 
  null as cleaned_middle_name, 
  null as cleaned_last_name, 
  coalesce(c.email, em.email) as email, 
  coalesce(c.phone, ph.phone_num :: varchar) as phone, 
  null as cleaned_phone, 
  p.profile_current_position as position, 
  coalesce(c.company, p.profile_company) as company, 
  coalesce(
    concat(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location as location, 
  cd.name, 
  cs.status_label, 
  coalesce(
    fc.connection_date, fc.created_at
  ) as connection_dateFROM tracking_campaign_prospects tcp 
  INNER JOIN contacts c ON tcp.contact_id = c.id 
  INNER JOIN prospects p ON tcp.prospect_id = p.id 
  LEFT JOIN first_connections fc ON fc.acceptor_l_id = c.l_id 
  AND fc.initiator_l_id = 'steven-r-kark-9a24b8177' 
  LEFT JOIN "LI_historic_data".emails em ON em.l_id = c.l_id 
  LEFT JOIN "LI_historic_data".phone_nums ph ON ph.l_id = c.l_id 
  LEFT JOIN campaign_definitions cd ON cd.id = tcp.campaign_definition_id 
  LEFT JOIN campaign_status cs ON cs.id = tcp.campaign_status_idWHERE tcp.campaign_definition_id in ('1826') 
order by 
  connection_date nulls last;
```

## Prospects who never Connected/Responded


```sql
/* 2nd Degree Pending, Withdrawn, No Responses */
SELECT 
  'marcus-a-guenther-mba-cpa-ca-296270196' AS partner_lid, 
  tcp.l_id AS lid, 
  CONCAT(
    'https://linkedin.com/in/', tcp.l_id
  ) AS url, 
  p.profile_name, 
  -- placeholders for post-processed columns --
  null as cleaned_name, 
  null as cleaned_first_name, 
  null as cleaned_middle_name, 
  null as cleaned_last_name, 
  coalesce(c.email, em.email) as email, 
  c.phone, 
  NULL AS cleaned_phone, 
  p.profile_current_position AS position, 
  COALESCE(c.company, p.profile_company) AS company, 
  COALESCE(
    CONCAT(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location AS location, 
  cd.name, 
  cs.status_label as campaign_status, 
  null AS connection_date 
FROM 
  tracking_campaign_prospects tcp -- your details
  INNER JOIN sonity_profiles sp ON sp.id = tcp.sonity_profile_id 
  INNER JOIN campaign_definitions cd ON cd.id = tcp.campaign_definition_id -- target details
  INNER JOIN campaign_status cs ON cs.id = tcp.campaign_status_id 
  INNER JOIN contacts c ON c.l_id = tcp.l_id 
  INNER JOIN prospects p ON c.prospect_id = p.id 
  inner join "LI_historic_data".emails em on em.l_id = c.l_id 
  left join "LI_historic_data".phone_nums pn on pn.l_id = c.l_id 
WHERE 
  tcp.sonity_profile_id = 21 
  and (
    (
      tcp.campaign_status_id = 3 
      and tcp.step = 1
    ) 
    or (
      tcp.step > 1 
      and tcp.campaign_status_id in (2, 14, 18)
    )
  )
```


## Campaign Dump Query

```sql
--all in campaign contacts 
SELECT 
  'steven-r-kark-9a24b8177' as partner_l_id, 
  c.l_id as lid, 
  concat(
    'https://linkedin.com/in/', c.l_id
  ) as url, 
  p.profile_name as profile_name, 
  null as cleaned_name, 
  null as cleaned_first_name, 
  null as cleaned_middle_name, 
  null as cleaned_last_name, 
  coalesce(c.email, em.email) as email, 
  coalesce(c.phone, ph.phone_num :: varchar) as phone, 
  null as cleaned_phone, 
  p.profile_current_position as position, 
  coalesce(c.company, p.profile_company) as company, 
  coalesce(
    concat(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location as location, 
  cd.name, 
  cs.status_label, 
  coalesce(
    fc.connection_date, fc.created_at
  ) as connection_date 
FROM 
  tracking_campaign_prospects tcp 
  INNER JOIN contacts c ON tcp.contact_id = c.id 
  INNER JOIN prospects p ON tcp.prospect_id = p.id 
  LEFT JOIN first_connections fc ON fc.acceptor_l_id = c.l_id 
  AND fc.initiator_l_id = 'steven-r-kark-9a24b8177' 
  LEFT JOIN "LI_historic_data".emails em ON em.l_id = c.l_id 
  LEFT JOIN "LI_historic_data".phone_nums ph ON ph.l_id = c.l_id 
  LEFT JOIN campaign_definitions cd ON cd.id = tcp.campaign_definition_id 
  LEFT JOIN campaign_status cs ON cs.id = tcp.campaign_status_id 
WHERE 
  tcp.campaign_definition_id = 1826 
order by 
  connection_date nulls last;
```

##  Most recent Thread Info

```sql
/* Topmost chat in each thread, ordered descending by time 
*  Our list of "known" chats
*/
select 
  * 
from 
  (
    SELECT 
      DISTINCT ON (thread_id) thread_id, 
      sender, 
      time, 
      hash, 
      created_at, 
      updated_at, 
      text 
    FROM 
      current_chats cc 
    WHERE 
      sonity_profile_id = 304 
    ORDER BY 
      thread_id, 
      time DESC
  ) uniqueThreads 
order by 
  time desc;
```

## Is Thread Stale

```sql
/* 
  Finds if input is fresher than last known chat in thread on DB
*/
WITH input_chats (thread_id, time) AS (
  VALUES 
    (
      '2-MmYwNTM3NjMtYWQ2NC00ZGUzLWJlYTQtYTNkYjFlNWNkOTI4XzAxMg==/', 
      '3:27 PM'
    ), 
    (
      '2-OGJmYTBhMTItZjA1Ni00NGQxLTgyNDktNzIxZmEwYmIxZDMxXzAxMA==/', 
      '12:57 PM'
    ), 
    ) 
SELECT 
  input_chats.thread_id 
FROM 
  input_chats 
  JOIN current_chats cc ON input_chats.thread_id = cc.thread_id 
WHERE 
  TO_TIMESTAMP(input_chats.time, 'HH12:MI AM') > cc.time :: TIMESTAMP;
```


## First connection since query

```sql
SELECT 
  initiator_l_id as partner_lid, 
  acceptor_l_id as lid, 
  concat(
    'https://linkedin.com/in/', acceptor_l_id
  ) as url, 
  p.profile_name, 
  c.email, 
  --coalesce(c.email, em.email),
  c.phone, 
  --coalesce(c.phone, ph.phone_num::varchar),
  null as cleaned_phone, 
  p.profile_current_position as position, 
  coalesce(c.company, p.profile_company) as company, 
  coalesce(
    concat(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location as location, 
  cd.name, 
  cs.status_label, 
  coalesce(
    fc.connection_date, fc.created_at
  ) as connection_date 
FROM 
  first_connections fc 
  inner join contacts spc on (spc.l_id = fc.initiator_l_id) --the sonity_profile's contact
  inner join sonity_profiles sp on (sp.contact_id = spc.id) 
  inner join tracking_campaign_prospects tcp on (
    tcp.l_id = fc.acceptor_l_id 
    and tcp.sonity_profile_id = sp.id
  ) 
  inner join campaign_definitions cd on cd.id = tcp.campaign_definition_id 
  inner join campaign_status cs on cs.id = tcp.campaign_status_id 
  inner join contacts c on c.l_id = fc.acceptor_l_id 
  inner join prospects p on c.prospect_id = p.id --left join "LI_historic_data".emails em on em.l_id = c.l_id
  --left join "LI_historic_data".phone_nums ph on ph.l_id = c.l_id
WHERE 
  initiator_l_id in (
    'alex-briganti-cpa-bb986820a', 'bradley-perco-cpa-ca-555b52203', 
    'chris-munn-2a3116201', 'gord-berger-life-tot-tep-7a618b1b0', 
    'igor-ivanisevic-ca-cpa-b1ba641ba', 
    'kevin-k-mouscos-cpa-3a842a1b1', 
    'marcus-a-guenther-mba-cpa-ca-296270196', 
    'nada-boutarieh-kamaleddine-cpa-cga-a71858191', 
    'steven-r-kark-9a24b8177'
  ) 
  and (fc.created_at > '2023-07-22')
```


## Email Address

```sql
SELECT 
  num_id, 
  location_country_id, 
  industry_id, 
  location_metro_id, 
  location_region_id, 
  email, 
  email_type, 
  l_id, 
  CASE WHEN email SIMILAR TO '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$' THEN 1 ELSE 0 END AS is_valid 
FROM 
  "LI_historic_data".emails;
```

## First degree connection query

```sql
SELECT 
  initiator_l_id as partner_lid, 
  acceptor_l_id as lid, 
  concat(
    'https://linkedin.com/in/', acceptor_l_id
  ) as url, 
  p.profile_name, 
  c.email, 
  c.phone, 
  null as cleaned_phone, 
  p.profile_current_position as position, 
  coalesce(c.company, p.profile_company) as company, 
  coalesce(
    concat(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location as location, 
  cd.name, 
  cs.status_label, 
  coalesce(
    fc.connection_date, fc.created_at
  ) as connection_date 
FROM 
  first_connections fc 
  inner join contacts spc on (spc.l_id = fc.initiator_l_id) --the Sonity_profile's contact
  inner join sonity_profiles sp on (sp.contact_id = spc.id) 
  inner join tracking_campaign_prospects tcp on (
    tcp.l_id = fc.acceptor_l_id 
    and tcp.sonity_profile_id = sp.id
  ) 
  inner join campaign_definitions cd on cd.id = tcp.campaign_definition_id 
  inner join campaign_status cs on cs.id = tcp.campaign_status_id 
  inner join contacts c on c.l_id = fc.acceptor_l_id 
  inner join prospects p on c.prospect_id = p.id --inner join "LI_historic_data".profiles pp on pp.l_id = c.l_id
WHERE 
  initiator_l_id in (
    'marcus-a-guenther-mba-cpa-ca-296270196'
  ) --and (fc.created_at > '2023-09-06' and fc.created_at < '2023-11-07')
ORDER BY 
  partner_lid DESC, 
  connection_date DESC;
```


## Second degree connection query

```sql
SELECT
    initiator_l_id AS partner_lid,
    acceptor_l_id AS lid,
    CONCAT('https://linkedin.com/in/', acceptor_l_id) AS url,
    p.profile_name,
    c.email,
    c.phone,
    NULL AS cleaned_phone,
    p.profile_current_position AS position,
    COALESCE(c.company, p.profile_company) AS company,
    COALESCE(
        CONCAT(
            (SELECT regexp_matches(p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'))[1],
            ' ',
            (SELECT regexp_matches(p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'))[2]
        ),
        ''
    ) AS years_in_current_position,
    p.profile_location AS location,
    cd.name,
    CASE
        WHEN cs.status_label = 'Connected' THEN 'Connection Accepted'
        WHEN cs.status_label = 'Replied' THEN 'Connection Accepted'
        WHEN cs.status_label = 'Withdrawn' THEN 'Connection Rejected'
    END AS status_label,
    COALESCE(fc.connection_date, fc.created_at) AS connection_date
FROM
    first_connections fc
    INNER JOIN contacts spc ON spc.l_id = fc.initiator_l_id
    INNER JOIN sonity_profiles sp ON sp.contact_id = spc.id
    INNER JOIN tracking_campaign_prospects tcp ON tcp.l_id = fc.acceptor_l_id AND tcp.sonity_profile_id = sp.id
    INNER JOIN campaign_definitions cd ON cd.id = tcp.campaign_definition_id
    INNER JOIN campaign_status cs ON cs.id = tcp.campaign_status_id
    INNER JOIN contacts c ON c.l_id = fc.acceptor_l_id
    INNER JOIN prospects p ON c.prospect_id = p.id
WHERE
    initiator_l_id = 'marcus-a-guenther-mba-cpa-ca-296270196'
    --AND cd.id = 1802
    --AND cs.status_label IN ('Connected', 'Replied', 'Withdrawn')
ORDER BY
    connection_date DESC;
```


## First Connection TCPs

```sql
SELECT 
  initiator_l_id as partner_lid, 
  acceptor_l_id as lid, 
  concat(
    'https://linkedin.com/in/', acceptor_l_id
  ) as url, 
  p.profile_name, 
  null as cleaned_name, 
  null as cleaned_first_name, 
  null as cleaned_middle_name, 
  null as cleaned_last_name, 
  coalesce(c.email, em.email) as email, 
  coalesce(c.phone, ph.phone_num :: varchar) as phone, 
  null as cleaned_phone, 
  p.profile_current_position as position, 
  coalesce(c.company, p.profile_company) as company, 
  coalesce(
    concat(
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [1], 
      ' ', 
      (
        SELECT 
          regexp_matches(
            p.profile_experience[1], '(\d*\s*(?:yr|yrs)?)?\s*(\d+ mos)'
          )
      ) [2]
    ), 
    ''
  ) AS years_in_current_position, 
  p.profile_location as location, 
  cd.name, 
  cs.status_label, 
  coalesce(
    fc.connection_date, fc.created_at
  ) as connection_date 
FROM 
  first_connections fc 
  inner join contacts spc on (spc.l_id = fc.initiator_l_id) --the sonity_profile's contact
  inner join sonity_profiles sp on (sp.contact_id = spc.id) 
  left join tracking_campaign_prospects tcp on (
    tcp.l_id = fc.acceptor_l_id 
    and tcp.sonity_profile_id = sp.id
  ) 
  left join campaign_definitions cd on cd.id = tcp.campaign_definition_id 
  left join campaign_status cs on cs.id = tcp.campaign_status_id 
  inner join contacts c on c.l_id = fc.acceptor_l_id 
  inner join prospects p on c.prospect_id = p.id 
  left join "LI_historic_data".emails em on em.l_id = c.l_id 
  left join "LI_historic_data".phone_nums ph on ph.l_id = c.l_id 
WHERE 
  initiator_l_id in (
    'pearcekyle', 'alex-briganti-cpa-bb986820a', 
    'bradley-perco-cpa-ca-555b52203', 
    'chris-munn-2a3116201', 'gord-berger-life-tot-tep-7a618b1b0', 
    'igor-ivanisevic-ca-cpa-b1ba641ba', 
    'kevin-k-mouscos-cpa-3a842a1b1', 
    'marcus-a-guenther-mba-cpa-ca-296270196', 
    'nada-boutarieh-kamaleddine-cpa-cga-a71858191', 
    'stevenk@corporateadvisors.ca', 
    'lisijie.xu@corporateadvisors.ca', 
    'caroline-ann-lock-37446a211', 
    'stevenk.linkedin@corporateadvisors.ca', 
    'steven-r-kark-9a24b8177', 'j-benjamin-de-leon-40390b212', 
    'robert-bob-blizzard-19a4b1268', 
    'maria-cruz-786200230', 'paul-black-p-eng-0a611919', 
    'pearcekyle', 'petrie-aucamp-cma-831254215'
  ) -- and (fc.created_at > '2023-07-22')
```


## Insert into blacklist titles

```sql
-- insert into blacklist titles
INSERT INTO sonity_prod2.blacklisted_titles (created_at, updated_at, id, title) 
VALUES 
  (
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 
    264, ''
  ) -- (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 175, 'CD')
  --(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 176, 'CCS')
  ON CONFLICT (id) DO 
UPDATE 
SET 
  created_at = excluded.created_at, 
  updated_at = excluded.updated_at, 
  title = excluded.title;
```

## Insert into TCPs

```sql
insert into sonity_prod2.tracking_campaign_prospects (
  step, status, type, created_at, updated_at, 
  sonity_profile_id, campaign_status_id, 
  contact_id, l_id, campaign_definition_id, 
  prospect_id, sales_nav_l_id
) (
  select 
    1 as step, 
    'Queued' as status, 
    'Messenger' as type, 
    now() as created_at, 
    now() as updated_at, 
    71 as sonity_profile_id, 
    1 as campaig_status_id, 
    c.id as contact_id, 
    c.l_id as l_id, 
    940 as campaign_definition_id, 
    p.id as prospect_id, 
    c.l_id as sales_nav_l_id 
  from 
    sonity_prod2.contacts c 
    inner join sonity_prod2.prospects p on c.l_id = p.contact_l_id 
  where 
    l_id in ('', '')
)
```

## Refresh Recent Tasks status

```sql
select 
  tasks.* 
from 
  sonity_prod2.tasks tasks 
  left join tcp_status_histories2 tcph on tasks.tracking_campaign_prospect_id = tcph.tracking_campaign_prospect_id 
where 
  date_trunc('day', tasks.updated_at) = current_date - interval '24 HOURS' 
  and task_status_id = 2
```

## Current chats

```sql
select * from current_chats cc
where thread_id in ('', '')
order by id asc
```

## Get event history

```sql
--events history
select 
  * 
from 
  sonity_prod2.events e 
where 
  type is not null 
  and user_email = 'pkblack@gtadevelop.com' 
  and target_l_id = 'sungklee' 
Order by 
  id desc 
Limit 
  50
```


## Examine Events History by Period

```sql
-- examing events history by period
select * from events e
where type = 'errors' --and sonity_profile_id = 10
and time > '2024-05-21'
and profile_name = 'Rebecca Schillemat'
 --and message = 'NoLidError'
order by updated_at desc
```




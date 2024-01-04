# Reports
Page for displaying user reports

**Path:** `src/components/pages/Reports/index.js` 

## Functions
#### `handleProfileChange`
Handle profile change. User can select one or mnultiple profiles


#### Params
|name|type  | description |
|--|--|--|
| event | `Event`  | Event of the selector component 

------ 

#### `handleCampaignChange`
Handle profile change. User can select one or multiple campaigns.


#### Params
|name|type  | description |
|--|--|--|
| event | `Event`  | Event of the selector component 

------ 

#### `selectedEmails Effect`
Executes when the selectedEmails change. It updates the graph filters linked with the sonity profile emails for all graphs


------ 

#### `selectedCampaigns Effect`
Executes when the selectedCampaigns change. It updates the graph filters linked with the campaigns for all graphs. 
            It also retrieves a new TcpSummaryTable


------ 

#### `timeWindow Effect`
Executes when the timeWindow changes. It updates the graphs' time dimensions and It also retrieves a new TcpSummaryTable


------ 

#### `Bootsrap Effect`
It instantiates the reports page. It retrieves the meta for the cubes and retrieves the charts first date


------ 

#### `sliderStartDate Effect`
When the slider start date changes, charts time dimensions are also changed so we get updated chart data


------ 

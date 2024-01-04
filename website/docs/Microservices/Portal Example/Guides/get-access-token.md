# Get Access Token and User Id

### Step 1: Start development tools
In your browser start development tools and head over to `Network` tab

![Get access token](/img/docs/access-token-1.png)


### Step 2: Trigger a request to the backend
Do anything that send a request to the back for example navigating to a new page


![Get access token](/img/docs/access-token-2.png)


This will trigger many requests. We are intrested the one labeled `graphql`.

### Step 3: Retrieve the token and user id

Click one `graphql` request and scroll down to request headers

![Get access token](/img/docs/access-token-3.png)

You should see:
1. Access Token  (`Authorization` header) 
2. User Id  (`X-Sonity-User-id` header)


Walla!!!!
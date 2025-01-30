## Understanding the scope of the problem
**Will this be a 1:1 chat system or can there be a group chat?
There will be both a 1:1 chat and group chat available.

**Will this be a web app, mobile app, or both?**
I'm going to focus on a web app for now.

**What is the scale of this app? Start up size or massive?**
For now I'm going to leave it as small as there will only be 1 DAU (me).

**For the group chat, what is the limit in terms of users?**
Alex Xu says 100 but I'll go with 50 for now.

**What important features will be in the app?**
- 1:1 chat
- group chat
- Online indicator
- Media sharing

**Is there a message size limit?**
Alex Xu recommends 100,000 characters. That seems like a lot to me but I'll defer to him.

**Is there end-to-end encryption required?**
Not for the current scope but if other people start using this then I'll definitely consider it.

**How long shall we store the chat history?**
For the time being it's just me so indefinitely. If others start using this and uploading then we'll probably clear things after 90 days because I don't want to be charged money...

**What are some techniques for server-initiated connections?**
### Polling
- Each poll opens up a new connection between the server and the client
- Client periodically asks the server if there are new messages
- Server responds yes or no

### Long Polling
- Client requests information from the server
- Server either returns information or there is a timeout
- Once a message is received the client then closes the connection and opens a new one
- Long polling keeps providing connections even when the user isn't chatting much

### Web Socket
- Unlike polling there is a constant connection open between the client and server
- Can leverage a web socket connection to the sender and receiver (two connections)

**Which one to use?**
We'll leverage Web Sockets as they provide the most bang for your buck when it comes to asynchronous chatting. Great for testing too! We won't use this technique for sign ups, logging in, and user information as these don't require immediate on-demand responses.

**What about scalability?**
So, I know that keeping things on a single server (for chat) is frowned upon but since I'm the only user this will be the approach I go for. In the future, the consideration will be to horizontally scale the service to avoid down-time/PoF. In the future we should have the following:
- Real time chat service that connects to senders/receivers via Web Sockets
    - Chat servers: Handle chat related information
    - Precense servers: Handle online/offline information
- K/V store (horizontally scaled) for keeping user data
    - So technically I should be using Redis or DynamoDB but I don't have the budget for this so MongoDB it is!
    - K/V store provides low latency for accessing data
    - Relational databases have expensive costs as the indexes grow (more information added to this data structure overtime)
- Generic Data: information about the user -> Use replication and sharding (split data across servers)

## Data Models
IDs will be generated using a local sequence number generator for uniqueness and ordering.

### Message Model
| field | isPrimary | type |
|-------|-----------|------|
| message_id | yes | bigint |
| message_from | no | bigint |
| message_to | no | bigint |
| content | no | text |
| created_at | no | timestamp |

### Message Model for Group
| field | isPrimary | type |
|-------|-----------|------|
| channel_id | yes | bigint |
| message_id | yes | bigint |
| user_id | no | bigint |
| content | no | text |
| created_at | no | timestamp |

Keeping in mind the information above and the inforation found in the Architecture documentation we'll focus on the following:
- 1:1 chat with low latency
- Small chat rooms of up to 50 people
- Online presence


## High level design
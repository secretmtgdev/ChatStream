**What data models are in use?**
- MessageModel (sender | content | timestamp)
- ChannelModel (partipants | update)
    - Messages we be filtered off of the channel

**How would this application be scaled?**
- Horizontally scale the server through a deployment
    - Have a load balancer direct traffic
- Shard the database (distribute across multiple db servers)

**What design patterns are in use?**
- MVC (Mongo + React + Express)
- Observer pattern: Real time interaction via web sockets

**What protocols are in place?**
- WebSockets: real time chat
- HTTP: REST api requests
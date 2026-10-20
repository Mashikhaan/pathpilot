
# STEP 1: Node.js ka base image use karna
# Isse container ke andar Node.js aur npm available honge
FROM node

# STEP 2: Container ke andar working directory set karna
# Ab aage ke relative paths /app se resolve honge
WORKDIR /app

# STEP 3: Backend root ki package files copy karna isliye path ./ yani gateway se bahaar jate hi backend
# package.json aur agar available ho to package-lock.json
COPY package*.json ./

# STEP 4: Root project ki dependencies install karna
RUN npm install

# STEP 5: Gateway ki package files copy karna through backend folder so source ./gateway
# Pehle package files copy karne se dependency installation
# aur source code copy karne ke steps alag rehte hain
COPY ./gateway/package*.json ./gateway/

# STEP 6: Gateway ki dependencies install karna
RUN cd gateway && npm install

# STEP 7: Gateway ka source code copy karna
COPY gateway ./gateway

# STEP 8: Shared code copy karna,here gateway need shared in which redis
# Jaise shared Redis connection ya doosre common modules
COPY shared ./shared

# STEP 9: Gateway folder ko working directory banana
WORKDIR /app/gateway

# STEP 10: Gateway ka intended port document karna
EXPOSE 8000

# STEP 11: Container start hone par Gateway run karna
# package.json mein "start": "node index.js" hona chahiye
CMD [ "npm", "start" ]


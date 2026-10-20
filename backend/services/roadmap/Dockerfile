# STEP 1: Node.js ka base image use karna
# Isse container ke andar Node.js aur npm available honge
FROM node

# STEP 2: Container ke andar working directory set karna
# Ab aage ke relative paths /app se resolve honge
WORKDIR /app

# STEP 3: Backend root ki package files copy karna
# package.json aur agar available ho to package-lock.json
COPY package*.json ./

# STEP 4: Root project ki dependencies install karna
RUN npm install

# STEP 5: Roadmap service ki package files copy karna
# Pehle package files copy karne se dependency installation
# aur source code copy karne ke steps alag rehte hain
COPY ./services/roadmap/package*.json ./services/roadmap/

# STEP 6: Roadmap service ke andar jaakar uski dependencies install karna
RUN cd services/roadmap && npm install

# STEP 7: Roadmap service ka poora source code copy karna
# Isme aapke roadmap generation logic, paths aur baaki files hongi
COPY services/roadmap ./services/roadmap

# STEP 8: Shared code copy karna
# Jaise shared database connections, utils ya doosre common modules
COPY shared ./shared

# STEP 9: Roadmap service folder ko working directory banana
WORKDIR /app/services/roadmap

# STEP 10: Roadmap service ka intended port document karna
EXPOSE 8004

# STEP 11: Container start hone par Roadmap service run karna
# package.json mein "start" script hona chahiye
CMD ["npm","start"]

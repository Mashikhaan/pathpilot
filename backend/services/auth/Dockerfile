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

# STEP 5: Auth service ki package files copy karna
# Pehle package files copy karne se dependency installation
# aur source code copy karne ke steps alag rehte hain
COPY ./services/auth/package*.json ./services/auth/

# STEP 6: Auth service ki dependencies install karna
RUN cd services/auth && npm install

# STEP 7: Auth service ka poora source code copy karna
# Isme aapke handlers, routes aur baaki files include hoti hain
COPY services/auth ./services/auth

# STEP 8: Shared code copy karna
# Jaise shared database connection ya doosre common modules
COPY shared ./shared

# STEP 9: Auth service folder ko working directory banana
WORKDIR /app/services/auth

# FIX STEP: Render ki secret file ko auth folder ke andar copy karna
# Chuki ham abhi /app/services/auth ke andar hain, to '.' ka matlab yahi folder hai
COPY /app/serviceAccountKey.json .

# STEP 10: Auth service ka intended port document karna
EXPOSE 8001

# STEP 11: Container start hone par Auth service run karna
# package.json mein "start" script hona chahiye
CMD ["npm", "start"]

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

# STEP 5: Resume service ki package files copy karna
# Pehle package files copy karne se dependency installation
# aur source code copy karne ke steps alag rehte hain
COPY ./services/resume/package*.json ./services/resume/

# STEP 6: Resume service ke andar jaakar uski dependencies install karna
RUN cd services/resume && npm install

# STEP 7: Resume service ka poora source code copy karna
# Isme aapke templates, logic aur resume processing ki files hongi
COPY services/resume ./services/resume

# STEP 8: Shared code copy karna
# Jaise shared helper functions, models ya doosre common modules
COPY shared ./shared

# STEP 9: Resume service folder ko working directory banana
WORKDIR /app/services/resume

# STEP 10: Resume service ka intended port document karna
EXPOSE 8002

# STEP 11: Container start hone par Resume service run karna
# Note: Aapki file me ["node", "start"] tha, use sahi karke ["npm", "start"] kiya hai
CMD [ "npm", "start"]

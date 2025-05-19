FROM quay.io/gurusensei/gurubhay:latest

RUN git clone https://github.com/Mek-d1/XYLO /root/XYLO

WORKDIR /root/XYLO/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]

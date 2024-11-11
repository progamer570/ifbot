# Telegram Bot Configuration

This repository contains the configuration settings for the Telegram bot. The bot is designed to perform a variety of actions such as sending and managing messages, handling commands, storing files, and interacting with users across multiple channels and groups.

This project was created for **skill improvement** and is implemented in **TypeScript**.

## Table of Contents

- [Introduction](#introduction)
- [Configuration Settings](#configuration-settings)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [License](#license)

## Introduction

This bot configuration allows you to manage multiple functions, including command handling, file storage, and communication with users and groups. The bot must be an **admin** in the specified channels and groups to function properly.

## Configuration Settings

Below are the key configuration settings that need to be updated for your bot to work:

### 1. **ADMIN_IDS**

- **Description**: List of Telegram user IDs who are authorized to manage the bot.
- **Example**:  
  `ADMIN_IDS=123456789 987654321`

### 2. **ALLOW_GROUPS**

- **Description**: List of group IDs where the bot is allowed to respond.
- **Example**:  
  `ALLOW_GROUPS=-100123456789 -100987654321`

### 3. **BACKUP**

- **Description**: Telegram link for backup storage.
- **Example**:  
  `BACKUP=https://t.me/backup_channel`

### 4. **BOT_USERNAME**

- **Description**: Username of the bot (set via BotFather).
- **Example**:  
  `BOT_USERNAME=my_bot_username`

### 5. **COLLECTION_AIO**

- **Description**: ID of the channel where the bot is an admin and stores or collects data.
- **Example**:  
  `COLLECTION_AIO=-100123456789`

### 6. **COLLECTION_AIO_BACKUP**

- **Description**: Optional backup channel for data collection.
- **Example**:  
  `COLLECTION_AIO_BACKUP=-100987654321`

### 7. **COLLECTION_HINDI**

- **Description**: Channel ID where the bot manages Hindi-related content.
- **Example**:  
  `COLLECTION_HINDI=-100112233445`

### 8. **DATABASE_URL**

- **Description**: MongoDB connection string for storing the bot's data.
- **Example**:  
  `DATABASE_URL=mongodb://localhost:27017/botdatabase`

### 9. **DB_AIO_CHANNEL_ID**

- **Description**: Channel where the bot stores files. The bot must be an admin in this channel.
- **Example**:  
  `DB_AIO_CHANNEL_ID=-100223344556`

### 10. **DB_ONGOING_CHANNEL_ID**

- **Description**: Channel for ongoing tasks or data management.
- **Example**:  
  `DB_ONGOING_CHANNEL_ID=-100667788990`

### 11. **DB_POSTER**

- **Description**: Poster channel link (bot must be admin).
- **Example**:  
  `DB_POSTER=https://t.me/poster_channel`

### 12. **DB_POSTER_ID**

- **Description**: ID of the poster channel.
- **Example**:  
  `DB_POSTER_ID=987654321`

### 13. **FORCE_CHANNEL_IDS**

- **Description**: Channel IDs where users must join before using the bot (optional).
- **Example**:  
  `FORCE_CHANNEL_IDS=-100123456789`

### 14. **FORCE_GROUP_IDS**

- **Description**: Group IDs where users must join before using the bot (optional).
- **Example**:  
  `FORCE_GROUP_IDS=-100987654321`

### 15. **ONGOING_COLLECTION**

- **Description**: Ongoing collection ID.
- **Example**:  
  `ONGOING_COLLECTION=-100112233445`

### 16. **JOIN**

- **Description**: Tag to add to a file for ongoing tasks.
- **Example**:  
  `JOIN=add_tag_to_file`

### 17. **REQUEST**

- **Description**: Number of requests allowed per user.
- **Example**:  
  `REQUEST=10`

### 18. **TELEGRAM_BOT_TOKEN**

- **Description**: Bot token obtained from BotFather.
- **Example**:  
  `TELEGRAM_BOT_TOKEN=123456789:ABCDEF1234567890`

### 19. **WEBHOOK_DOMAIN**

- **Description**: The domain for the webhook (if using webhooks).
- **Example**:  
  `WEBHOOK_DOMAIN=https://mybotdomain.com`

### 20. **HOW_TO_DOWNLOAD_MSG_LINK**

- **Description**: Telegram message link or tutorial video for downloading.
- **Example**:  
  `HOW_TO_DOWNLOAD_MSG_LINK=https://t.me/message_id_for_tutorial`

## Setup Instructions

1. Clone this repository to your local machine or server.
2. Install the required dependencies using `npm install`.
3. Set up your `.env` file with the necessary values (refer to the configuration settings above).
4. Start the bot locally using `npm run dev`.

### To Deploy on Render:

1. **Create a Render Account**:  
   Go to [Render](https://render.com/) and sign up for an account if you don't have one.

2. **Create a New Web Service**:

   - Click on **New** and select **Web Service**.
   - Select **Public repository** and enter the repository URL: `https://github.com/anmol0404/ifbot`.
   - Choose the branch you want to deploy (usually `main` or `master`).

3. **Configure Environment Variables**:

   - In the **Environment** section of the Render service setup, add the necessary environment variables (like the values from your `sample.env` file).
   - Render will automatically use these environment variables when deploying the application.

4. **Deploy the Bot**:

   - After setting the environment variables, Render will automatically deploy the bot.
   - You can monitor the deployment process in the Render dashboard.

5. **Access the Bot**:
   - Once deployed, copy the domain from the Render dashboard and update the `WEBHOOK_DOMAIN` environment variable with this domain.

## How to Use

- Once the bot is configured and running, you can interact with it using the available commands.
- Use the `/help` command to see available options.
- Ensure that the bot is an admin in the specified channels and groups to perform the necessary actions.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

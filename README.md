# Basiq Connector Status Outage with Slack Integration

## Overview

This project provides a slack integration for monitoring the status of connectors from the Basiq API. It includes integration with Slack to send notifications when connectors are not operational. The application is built using Node.js, Express, Axios, and the @slack/web-api package.

## Features

- Fetches connector status from the Basiq API.
- Notifies Slack when a connector is not operational.
- Handles rate limiting from the Slack API with a backoff strategy.

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/basiq-dashboard.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add your Slack API token and channel ID:
      ```
      SLACK_TOKEN=your_slack_api_token
      SLACK_CHANNEL_ID=your_slack_channel_id
      ```

4. **Run the server**:
    ```bash
    npm start
    ```

5. **Access the dashboard**:
    Open your web browser and navigate to `http://localhost:3000/api/status` to view the current status of connectors.

## Usage

- The dashboard automatically fetches connector status from the Basiq API and sends notifications to Slack if any connectors are not operational.
- You can customize the frequency of status updates by adjusting the GitHub Actions workflow schedule in `.github/workflows/slack-notification.yml`.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project uses the following packages:
  - Express: https://github.com/expressjs/express
  - Axios: https://github.com/axios/axios
  - @slack/web-api: https://github.com/slackapi/node-slack-sdk

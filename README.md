# E-Commerce-Admin-Panel
It's an admin panel for e commerce web sites. Frontend uses vite js and backend uses nodejs.

# E-Commerce-Admin-Panel

It's an admin panel for e commerce web sites. Frontend uses vite js and backend uses nodejs.

## Features

- **User Management:** Administer user accounts with authentication and authorization.
- **Product Management:** Create, update, and delete products with detailed information such as name, description, and price.
- **Order Management:** Monitor and manage customer orders efficiently.
- **Dashboard:** View key metrics and gain insights into the store's performance.

## Frontend
The frontend of this project utilizes [Tailwind CSS](https://tailwindcss.com/) and [shadcn-ui](https://ui.shadcn.com/).

Shadcn-ui is an open source customizable component library.

Tailwind css is a utility-first CSS framework that provides a set of low-level utility classes to build designs directly in your markup. It offers a highly customizable and efficient way to style your application.

To get started with Tailwind CSS, check out the [official documentation](https://tailwindcss.com/docs).

## Backend

- MySQL Database
- NodeJS with Typescript
- TypeOrm

## Getting Started
## Installation

### Normal Installation

Use the package manager [npm](https://www.npmjs.com/) to install E-Commerce-Admin-Panel.

```bash
npm install
```

## Usage

It is necessary to run the backend server before running the frontend server. Otherwise, the frontend server will not be able to access the backend server.

```bash
npm run dev
```

### Docker Installation

To run the E-Commerce Admin Panel using Docker, follow these steps:

#### Prerequisites

- Docker installed on your machine. If you don't have Docker installed, you can download and install it from [here](https://www.docker.com/products/docker-desktop).

#### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mkemalgokce/E-Commerce-Admin-Panel
   ```

2. Navigate to the project root directory:

   ```bash
   cd E-Commerce-Admin-Panel
   ```

3. Build and start the Docker containers using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This command will download the necessary images, build the containers, and start the services in detached mode.

4. Open your browser and visit `http://localhost:4026` to access the E-commerce Admin Panel API.

6. Open client folder and run the following command to start the frontend application:

   ```bash
   npm run dev
   ```

## License

## ScreenShots

<img width="1440" alt="image" src="https://github.com/mkemalgokce/E-Commerce-Admin-Panel/assets/46056478/09a11be7-7d56-4b6a-9b49-9cfcaa738579">
<img width="1440" alt="image" src="https://github.com/mkemalgokce/E-Commerce-Admin-Panel/assets/46056478/4c70c9a8-fd92-421f-aaf5-d9f3df671769">



[MIT](https://choosealicense.com/licenses/mit/)

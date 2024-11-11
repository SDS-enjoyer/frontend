# Project CampGround

This project is a Next.js application that utilizes both Shadcn UI and Aceternity UI for its component library.

## Setup Instructions

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Tenkris/Campground-frontend.git
cd Campground
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Add Shadcn UI Components

To add Shadcn UI components to your project, use the following command:

```bash
npx shadcn@latest add [component-name]
```

Replace `[component-name]` with the name of the component you want to add. For example:

```bash
npx shadcn@latest add button
```

To add multiple components at once:

```bash
npx shadcn@latest add button card toast
```

### 4. Add Aceternity UI Components

To add Aceternity UI components, use the following command:

```bash
npx aceternity-ui@latest add [component-name]
```

Replace `[component-name]` with the name of the component you want to add. For example:

```bash
npx aceternity-ui@latest add bento-grid
```

To add a component along with its related demos/examples:

```bash
npx aceternity-ui@latest add [component-name] -e
```

## Running the Development Server

After completing the setup, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional Information

- This project uses Next.js. For more information, check out the [Next.js documentation](https://nextjs.org/docs).
- For Shadcn UI component documentation, visit [Shadcn UI](https://ui.shadcn.com/).
- For Aceternity UI component documentation, visit [Aceternity UI](https://ui.aceternity.com/).

## Contributing

### Create a new branch

- To keep your changes organized, create a new branch for your feature or bug fix. Run the following command, replacing feature-branch with a descriptive name for your branch

```bash
git checkout -b feature-branch
```

- Create a Pull Request (PR) to merge your changes into the main branch.

## License

(Specify the license under which your project is released)

### Deploy ment front

```sh
docker build -t tenkr/sds-frontend:lastest .
docker login
docker push tenkr/sds-frontend:lastest
```

# Test-vandar

## What you should know about this project?

Nothing really complicated about this project, to start it locally you just need
to do as follows:

1. `yarn install`: use this command to install all the necessary dependencies
2. `yarn start`: use this command to start this project locally on the port
   `3000`

## What you should know of this project as a developer?

### Extra commands

There are some handful extra commands that you can use to get some stuff done as
follows:

- `yarn lint`: use this command to lint all files in the project by the `eslint`
  tool
- `yarn format`: use this command to format all files within the project by
  default `prettier` config which can be get modified in `.prettierrc` file
  located in the project root
- `yarn test`: use this command to run all the available tests within the
  project
- `yarn storybook`: use this command to run the app storybook

### Folders

There are multiple folders in this project each of them contain some part of the
whole thing. The main ones are as follows:

1. `assets`: contains all project assets like icons, general styles, fonts, and
   background images.
2. `components`: contains all reusable parts of the project, which used more
   than once in different pages or other components
3. `localization`: contains all the setting related to project language
   localization
4. `pages`: contains all of the pages which will be rendered for each route
5. `routes`: contains all the routes which will be used to render the pages
6. `shared`: contains all the shared elements like variables or constant
   variables which are identical all over the project
7. `utils`: contains all of the reusable functions or custom hooks

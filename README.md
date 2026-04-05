# MyWatchlist 

Mobile application developed using **React Native CLI** as part of a technical assessment.  
The app allows users to manage a watchlist of financial instruments with simulated real‑time price updates and optional integration with a public API.
---

## Tech Stack

- React Native CLI - main environment used to build the application
- React Navigation - navigation management (stack + tabs)
- Zustand - global state management for watchlist, favorites and authentication
- AsyncStorage - local persistence for each user's watchlist and favorites
- react-native-gifted-charts - library used to render the price chart on the detail screen
- CoinGecko API - real market data for financial instruments
- Custom theming - light/dark mode support with consistent colors across the entire app

---

## Setup & Run

1. Create the project

```bash
    npx react-native init MyWatchlist --template react-native-template-typescript
    cd MyWatchlist
```

2. Install base dependencies

```bash
    npm install
```

3.Install project dependencies

```bash

    npm install zustand
    npm install @react-native-async-storage/async-storage
    npm install @react-navigation/native @react-navigation/native-stack
    npm install react-native-screens react-native-safe-area-context
    npm install @shopify/react-native-skia
    npm install react-native-gifted-charts react-native-svg
```

4.Run the application

```bash

    npx react-native start 
    npx react-native run-android

    npm run android
```

5.GitHub Branches

 -develop: uses mock data stored in the data folder
 -feature/Alvaro: fetches instrument data from the CoinGecko API

---

## How It Works

The application includes a login screen where users must authenticate before accessing the main features. Once logged in , each user can:

    -Search for financial instruments
    -Add instruments to their personal watchlist
    -Add or remove instruments from favorites
    -Access their profile to view their information
    -Log out at any time

Each user has their own independent watchlist and favorite, both persisted locally using AsyncStorage.
I chose Zustand for state management because it's ideal for small and medium sized projects. It offers excellent performance, scalability, and simplicity, allowing the codebase to remain clean and easy to maintain.

---

## Project Structure

### Navigation

The navigation is organized in a modular way to keep the architecture clean and scalable. It is divided into three main components, each with a specific responsibility:

    1.TabNavigator

        Handles navigation through a floating tab bar that allows switching between the main screens of the app: WatchlistScreen, FavoritesScreen, SearchScreen and ProfileScreen.
    
    2.MainStackNavigator

        Acts as an intermediate layer between the TabNavigator and screens that aren't part of the tab bar, such as DetailScreen, which is accessed by tapping an instrument card from any screen.
    
    3.RootNavigator

        Determines whether the user should go through the login flow or be redirected directly to the WatchlistScreen. 
        This enables auto-login when a valid session exists

### Data

Contains mock users, mock instruments, and the color palettes used for light and dark mode.

### Screens

Each file in this folder represent one of the main screens of the application.

### Components

Reusable UI components, including:

 -CustomTab: improves the design of the tab bar. Instead of traditional SVG icons, it uses Skia to achieve smoother animations, more modern style and better performance on     mobile.

 -InfoRow: provides a cleaner, more modern layout for the profile view

 -InstrumentCard: reusable across multiple screens. It's buttons are controlled via boolean props to show only what is needed in each context.


### Store

Global state is managed using Zustand, split into three independent stores. Each store handles a specific part of the application, keeping the code modular, clean and scalable

    1.AuthStore

        Manages everything related to user authentication and user-specific data:

        -User favorites
        -User watchlist
        -Login and logout
        -Auto-login

        Each user has their own independent watchlist and favorites.

    2.ThemeStore

        Controls the app's light/dark mode:

        -Stores the current theme
        -Allow toggling between themes
        -Integrates with the useTheme
        
        This ensures consistent and smooth theming across the entire app.

    3.WatchlistStore

    Handles instrument data, not user data:

        -Global list of available instruments
        -Price updates
    
### Service

Contains the logic required to perform actions and make HTTP request.
This separation keeps the global state clean and avoids mixing business logic with state management

---

## Future Improvements

-Create a backend API: to manage users, watchlist and favorites from a real server. This would also allow adding a registration screen, secure authentication using JWT and password-recovery flow.

-Add internationalization(i18n): so users can switch between different languages and the app updates automatically.

-Implement SSE(Server-Sent Events): to receive continuous price updates without needing to poll the API every 5-60 seconds, improving performance and reducing network usage.

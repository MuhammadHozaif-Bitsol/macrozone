# MacroZone

A simple macro and calorie tracker built with Expo and React Native. Log meals, see your calorie, protein, carb and fat totals at a glance, and share a daily summary.

## Features

- **Dashboard**: today's date, macro totals against goals (2,000 cal · 150g protein · 250g carbs · 65g fat), and your 5 most recent meals
- **Add Meal**: log a meal with name, calories, protein, carbs and fat
- **All Meals**: full meal list, long-press a meal to delete it, or clear everything at once
- **Copy & Share**: copy the macro summary to the clipboard or send it through the native share sheet
- **Haptic feedback** when meals are added or deleted
- **App-styled dialogs** for confirmations and messages
- Meals are saved on the device with AsyncStorage, so there's no account or backend

## Tech stack

- [Expo](https://expo.dev) SDK 57, React Native 0.86, React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) with file-based routing and bottom tabs
- TypeScript
- `@react-native-async-storage/async-storage`, `expo-haptics`, `expo-clipboard`, `@expo/vector-icons`
- ESLint with `eslint-config-expo` and `eslint-plugin-sonarjs`

## Getting started

Requirements: Node.js and the [Expo Go](https://expo.dev/go) app on your phone (or an Android emulator / iOS simulator).

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

## Scripts

| Command            | What it does                     |
| ------------------ | -------------------------------- |
| `npm start`        | Start the Expo dev server        |
| `npm run android`  | Start and open on Android        |
| `npm run ios`      | Start and open on iOS            |
| `npm run web`      | Start and open in the browser    |
| `npm run lint`     | Lint with Expo + SonarJS rules   |
| `npx tsc --noEmit` | Type-check the project           |

## Project structure

```
src/
├── app/                    # Routes (Expo Router)
│   ├── _layout.tsx         # Root stack
│   └── (tabs)/
│       ├── _layout.tsx     # Bottom tab bar
│       ├── index.tsx       # Home dashboard
│       ├── add-meal.tsx    # Add Meal form
│       └── meals.tsx       # All Meals list
├── components/             # MacroGrid, MacroCard, MealItem, RecentMeals,
│                           # ConfirmDialog, CopyButton, ShareButton, HomeHeader
├── storage/meals.ts        # Meal type + get/add/delete/clear meals
├── styles/global.ts        # Shared colors and styles
└── utils/storage.ts        # JSON helpers around AsyncStorage
```

## Notes

- Macro totals currently include every saved meal, not just today's.
- Haptics need a physical device; emulators usually don't vibrate.

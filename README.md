# Elementsweeper

Elementsweeper = Minesweeper + Stripe Elements

Plays like Minesweeper, but if you click on a bomb you can buy your way out of trouble. Perhaps a metaphor for life.



## Setup

Create a .env file with the following values:
```
PORT=3000
STRIPE_API_KEY=your_Stripe_secret_key
SESSION_SECRET=some_random_string
```

To run on Glitch, you shouldn't need to do anything else.

To run locally:
  1. `npm install` to get the packages
  1. `npm run dev` to launch the dev server on http://localhost:3000 (or whatever port you specify in .env)
  1. `npm run watch` to rebuild your JS bundle on changes

## Notes
- this is a test mode app, you can't spend real money
- your purchase is stored in a session cookie, so if you clear cookies you'll lose your lives
- stored credit cards / Payment Request button doesn't work in Chrome/Edge because you can only store live cards, and you can't make testmode purchases with them


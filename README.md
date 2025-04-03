# Monad Ecosystem Leaderboard

A real-time leaderboard website for the Monad ecosystem that ranks players based on their activity and holdings.

## Features

- Real-time player rankings based on composite scores
- Detailed player profiles with activity metrics
- Interactive charts and visualizations
- Search and filter functionality
- Responsive design for desktop and mobile

## Metrics

The composite score is calculated using four key metrics:

1. Number of transactions (30% weight)
2. Number of unique contract address interactions (25% weight)
3. Number of days active (20% weight)
4. Amount of MON tokens held (25% weight)

## Technical Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Data Visualization**: Recharts
- **Real-time Updates**: Polling mechanism (configurable interval)
- **API**: Next.js API Routes

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_MONAD_API_URL=your_monad_api_url
NEXT_PUBLIC_UPDATE_INTERVAL=30000 # Update interval in milliseconds
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── player/            # Player details pages
│   └── page.tsx           # Main page
├── components/            # React components
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## Security Considerations

- All data is fetched directly from the Monad blockchain
- No sensitive data is stored locally
- API endpoints are protected against common vulnerabilities
- Input validation is implemented for all user inputs

## Future Enhancements

- WebSocket integration for real-time updates
- Internationalization support
- Advanced analytics and insights
- Customizable leaderboard views
- Historical data comparison

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

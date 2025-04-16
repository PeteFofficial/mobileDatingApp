# MeaningfulDates

A dating app focused on meaningful connections instead of endless swiping. Users can only engage in one conversation at a time, encouraging genuine interaction and reducing time wasted on insincere matches.

## Vision

Most dating apps today prioritize quantity over quality, leading to:
- Endless swiping with little meaningful connection
- Users who match with everyone for attention, not genuine interest
- The impossibility of maintaining quality conversations with multiple matches

MeaningfulDates solves these problems by:
1. Only showing profiles that match your preferences and likely to reciprocate interest
2. Limiting users to one active conversation at a time
3. Using intelligent matching to identify and avoid users who indiscriminately like everyone

## Core Features

### Quality-Focused Matching
- Smart filtering based on detailed preferences (including gender, age, distance, ethnicity, and interests)
- Machine learning to identify genuine vs. attention-seeking behavior
- Showing only profiles with high potential for mutual interest
- Photo ranking system to highlight users' most appealing images
- Data-driven approach to improve matching success rates

### Advanced Filtering System
- **Gender Preference**: Users are shown only profiles that match their stated preference
- **Demographic Filters**: Age, distance, ethnicity, education level
- **Lifestyle Preferences**: Smoking, drinking, exercise habits, diet
- **Relationship Goals**: Looking for casual dating or serious relationship
- **Interactive Interests**: Shared activities, hobbies, entertainment preferences
- **Values Alignment**: Political views, religious beliefs, family planning
- All preferences weighted by importance to the user

### 3-Day Connection Journey
- **Stage-Based Progression**: Text Chat → Voice Call → Video Call → Real-World Meeting
- **Gamified Engagement Metrics**:
  - Conversation Badges: Deep Diver, Laughter Connection, Quick Responder, Shared Interest, Vulnerability Moment
  - Star Rating System: progressing from basic connection to meeting suggestion
- **Smart Time Management**:
  - 72-Hour Clock: Starts at first message
  - Progress Bar: Shows time remaining and current stage
  - Grace Period: 24-hour extension available if both users agree

### One-at-a-Time Conversations
- Multiple matches stored in a "waiting area" queue
- Only one active conversation permitted
- Next match selected when current conversation ends or mutual agreement to move on
- Structured conversation stages with gentle time limits (messaging → phone → meeting)
- Mutual opt-out option if both users agree the match isn't working

### Premium Experience
- Clean, focused UI emphasizing the current match
- Compatibility scores based on shared interests and goals
- Feedback system to continuously improve matching algorithm
- AI-assisted quality scoring for conversations

## Stage Unlock Requirements

| Stage | Requirements | UI Elements |
|-------|--------------|-------------|
| Text | Initial connection | Basic chat interface |
| Voice | 3 badges + 48h elapsed | Phone icon appears |
| Video | 5 badges + ★★ rating | Video button pulses |
| Meeting | 8 badges + mutual ★★★★ rating | "Suggest Meeting" CTA |

## Current Implementation Status

The app is currently in active development with the following features implemented:

### Implemented Features
- User authentication (registration, login, password recovery)
- Bottom tab navigation with icon-based tabs
- Discovery screen with swipeable profile cards
- Filters screen for preference-based matching (age, distance, interests, gender preference, relationship goals)
- Matches screen to view current matches
- Messages screen for conversation overview
- Conversation screen for one-on-one chat with 3-day journey implementation
- Conversation progress tracking with badges and stage progression
- Profile screen with user details and comprehensive settings options
- Firebase integration for authentication
- Ethnicity filtering
- Relationship goals filtering (Casual or Serious)

### In Progress
- Backend implementation for real-time matching
- Chat functionality
- Algorithm development for quality matching
- User preference storage and retrieval
- Queue management for matches
- Photo ranking system
- Time-based conversation management

## Project Structure

```
MeaningfulDates/
├── App.js                 # Main application component
├── assets/                # App icons and images
├── src/                   # Source code
│   ├── config/            # Configuration files
│   │   └── firebase.js    # Firebase configuration
│   ├── screens/           # Application screens
│   │   ├── Auth/          # Authentication screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── ForgotPasswordScreen.js
│   │   ├── Discovery/     # Main discovery and matching screens
│   │   │   ├── DiscoveryScreen.js
│   │   │   └── FiltersScreen.js
│   │   ├── Conversation/  # Messaging screens
│   │   │   └── ConversationScreen.js
│   │   ├── Matches/       # Match management screens
│   │   │   └── MatchesScreen.js
│   │   ├── MessagesScreen.js
│   │   └── ProfileScreen.js
```

## Conversation Models

```javascript
// Conversation progression model
{
  matchId: String,
  users: [userId1, userId2],
  startTime: DateTime,
  currentStage: Enum('text','voice','video','meeting'),
  earnedBadges: [String],
  starRating: Number,
  lastInteraction: DateTime,
  extensionUsed: Boolean,
  conversationQualityScore: Number // AI-generated
}
```

### Frontend Components
- **Authentication Flow**: Registration, login, and password recovery
- **Navigation**: Bottom tab navigation with four main tabs
- **Discovery**: Card-based swiping interface with filtering options
- **Messaging**: Conversation list and one-on-one chat interface
- **Profile Management**: User profile viewing and editing
- **Conversation Progress**: Badge system, star ratings, and stage progression

### Backend Components
- **Firebase Authentication**: User account management
- **Firestore Database**: Profile and conversation storage
- **Firebase Storage**: Image storage for user profiles
- **AI Conversation Analysis**:
  - Message response time patterns
  - Question/answer ratio
  - Emotional tone detection
  - Shared interest identification
  - Vulnerability indicators

## User Flow Example

**Day 1**:
- Users match and begin texting
- System suggests icebreaker questions
- Badges appear as they hit milestones

**Day 2**:
- After earning 3 badges, voice call unlocks
- "You've connected well! Try a voice call today?" prompt appears
- Star rating increases to ★★ after successful call

**Day 3**:
- Video call option pulses in interface
- Progress bar shows "12 hours remaining"
- System suggests: "You've found 4 shared interests - time for video?"

**Post-72h**:
- Successful connections can continue indefinitely
- Unsuccessful pairs amicably separate with option to provide feedback
- Next match from queue becomes available

## Getting Started

### Prerequisites
- Node.js and npm
- Expo CLI
- Firebase account

### Installation
1. Clone the repository
   ```
   git clone https://github.com/yourusername/MeaningfulDates.git
   cd MeaningfulDates
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure Firebase
   - Create a Firebase project in the Firebase Console
   - Enable Authentication with Email/Password
   - Add your Firebase configuration to `src/config/firebase.js`

4. Start the development server
   ```
   npm start
   ```

5. Scan the QR code with Expo Go (Android) or the Camera app (iOS)

## Development Roadmap

1. **MVP Enhancement** (Current Phase)
   - Complete real-time chat functionality
   - Implement profile editing
   - Develop basic matching algorithm
   - Add ethnicity and advanced filtering options
   - Build queue management system for matches

2. **Conversation System Implementation**
   - Build badge tracking system and time-based progression
   - Implement voice/video calling integration
   - Develop conversation stage unlock mechanics
   - Create progress visualization components

3. **Analytics Integration**
   - Data collection for conversation success metrics (with user consent)
   - Identifying optimal time frames for messaging stages
   - Analysis of successful vs unsuccessful matches to refine algorithm
   - Pattern recognition for compatible personality types and communication styles
   - Feedback system to continuously improve user experience

4. **AI Enhancement**
   - Implement preference-based filtering
   - Develop behavior analysis for better matches
   - Add compatibility scoring
   - Develop AI conversation scoring

5. **Testing & Optimization**
   - User testing
   - Performance optimization
   - UX refinement

6. **Feature Expansion**
   - Premium subscription features
   - Advanced matching algorithms
   - Social features and success stories
   - Match transition flow (current → next)

## Unique Value Proposition

MeaningfulDates distinguishes itself from other dating apps through:

1. **Focus on Quality**: By limiting users to one conversation at a time, we encourage deeper connections
2. **Reduced Overwhelm**: No more endless swiping through hundreds of profiles
3. **Genuine Interactions**: Our matching algorithm prioritizes users who demonstrate authentic engagement
4. **Time Efficiency**: Spend time getting to know one person well instead of juggling multiple shallow conversations
5. **Structured Progress**: Gentle time limits and conversation stages prevent stagnation and encourage real-world meetings
6. **Fair Attention**: Every match gets proper attention without being lost in a sea of conversations
7. **Mutual Control**: Both parties must agree to end a conversation before either can move to their next match
8. **Momentum-Based Design**: Creates natural urgency without pressure
9. **Positive Reinforcement**: Badges reward meaningful behaviors
10. **Real-World Focus**: Systematically progresses toward actual dates

## Contribution

If you're interested in contributing to this project, please feel free to submit pull requests or reach out to discuss collaboration opportunities.

## License

[MIT License](LICENSE)

## Acknowledgments

- Inspired by the need for more meaningful connections in the dating app space
- Designed to save time and emotional energy by focusing on quality over quantity 
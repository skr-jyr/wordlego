import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart'; // Import dotenv
import 'screens/home_screen.dart';
import 'screens/theme_selection.dart'; // Import your ThemeSelectionScreen
import 'screens/game_screen.dart'; // Import your GameScreen
import 'screens/result_screen.dart'; // Import your ResultScreen
import 'services/word_validator.dart';

void main() async {
  // Load your .env file asynchronously
  await dotenv.load(fileName: ".env");

  runApp(const WordLegoApp());
}

class WordLegoApp extends StatelessWidget {
  const WordLegoApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WordLego',
      theme: ThemeData(
        primarySwatch: Colors.orange,
        brightness: Brightness.light,
      ),
      initialRoute: '/',
      onGenerateRoute: (settings) {
        if (settings.name == '/') {
          return MaterialPageRoute(builder: (context) => const HomeScreen());
        } else if (settings.name == '/theme-selection') {
          return MaterialPageRoute(
              builder: (context) => const ThemeSelectionScreen());
        } else if (settings.name == '/game') {
          final args = settings.arguments as Map<String, dynamic>?;

          if (args == null ||
              !args.containsKey('mode') ||
              !args.containsKey('theme')) {
            // Handle missing arguments: you can redirect or throw error
            return MaterialPageRoute(
              builder: (context) => const Scaffold(
                body: Center(child: Text('Missing arguments for GameScreen')),
              ),
            );
          }

          return MaterialPageRoute(
            builder: (context) => GameScreen(
              mode: args['mode'],
              theme: args['theme'],
            ),
          );
        } else if (settings.name == '/result') {
          final args = settings.arguments as Map<String, dynamic>?;

          if (args == null ||
              !args.containsKey('winner') ||
              !args.containsKey('player1Score') ||
              !args.containsKey('player2Score')) {
            // Handle missing arguments for ResultScreen
            return MaterialPageRoute(
              builder: (context) => const Scaffold(
                body: Center(child: Text('Missing arguments for ResultScreen')),
              ),
            );
          }

          return MaterialPageRoute(
            builder: (_) => ResultScreen(
              winner: args['winner'],
              player1Score: args['player1Score'],
              player2Score: args['player2Score'],
            ),
          );
        }

        // Add other routes similarly or return null for unknown routes
        return null;
      },
    );
  }
}

class Initializer extends StatefulWidget {
  const Initializer({Key? key}) : super(key: key);

  @override
  _InitializerState createState() => _InitializerState();
}

class _InitializerState extends State<Initializer> {
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    _initializeApp();
  }

  Future<void> _initializeApp() async {
    final validator = WordValidator();
    final isValid = await validator.isValidWord('example', 'theme');
    print('Is valid: $isValid');
    setState(() {
      _isInitialized = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isInitialized) {
      return const Center(child: CircularProgressIndicator());
    } else {
      return const WordLegoApp();
    }
  }
}

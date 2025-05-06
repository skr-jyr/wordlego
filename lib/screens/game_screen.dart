import 'dart:async';
import 'package:flutter/material.dart';
import 'result_screen.dart'; // Import the ResultScreen
import '../services/word_validator.dart'; // Import the WordValidator

class GameScreen extends StatefulWidget {
  final String mode; // 'vs_ai' or 'two_player'
  final String theme;

  const GameScreen({Key? key, required this.mode, required this.theme})
      : super(key: key);

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  final Color tealLight = const Color(0xFF57B4BA);
  final Color tealDark = const Color(0xFF015551);
  final Color orangeAccent = const Color(0xFFFE4F2D);
  final Color player1Color = const Color(0xFFE0F7FA); // Light Blue
  final Color player2Color = const Color(0xFFE8F5E9); // Light Green

  static const int roundTimeSeconds = 30;

  Timer? timer;
  int timeLeft = roundTimeSeconds;

  String currentTurn = 'Player 1';
  List<String> wordChain = [];
  TextEditingController wordController = TextEditingController();
  bool isInputEnabled = true;
  String message = '';

  int player1RoundsWon = 0;
  int player2RoundsWon = 0;
  final int roundsToWin = 3;

  final WordValidator wordValidator =
      WordValidator(); // Instantiate WordValidator

  @override
  void initState() {
    super.initState();
    startTurn();
  }

  @override
  void dispose() {
    timer?.cancel();
    wordController.dispose();
    super.dispose();
  }

  void startTurn() {
    setState(() {
      timeLeft = roundTimeSeconds;
      message = '';
      isInputEnabled = true;
    });
    timer?.cancel();
    timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (timeLeft > 0) {
        setState(() {
          timeLeft--;
        });
      } else {
        t.cancel();
        onLoseRound(currentTurn, 'ran out of time');
      }
    });
  }

  Future<bool> checkWordValidity(String word) async {
    // Validate the word using the WordValidator
    return await wordValidator.isValidWord(word, widget.theme);
  }

  bool isRuleBroken(String word) {
    if (word.isEmpty) return true;
    if (wordChain.contains(word)) return true; // repeated word
    if (wordChain.isNotEmpty) {
      String lastWord = wordChain.last;
      if (word.toLowerCase()[0] !=
          lastWord.toLowerCase().substring(lastWord.length - 1)) {
        return true; // doesn't start with last letter
      }
    }
    return false; // no break
  }

  void submitWord() async {
    String word = wordController.text.trim();
    setState(() {
      isInputEnabled = false;
    });
    timer?.cancel();

    bool validWord = await checkWordValidity(word);

    if (!validWord || isRuleBroken(word)) {
      onLoseRound(currentTurn, 'entered an invalid or repeated word');
      return;
    }

    // Word is valid and follows rules
    setState(() {
      wordChain.add(word);
      message = '';
      wordController.clear();
    });

    // Switch turn for the next player
    Future.delayed(const Duration(milliseconds: 500), () {
      nextTurn();
    });
  }

  void nextTurn() {
    setState(() {
      currentTurn = (currentTurn == 'Player 1') ? 'Player 2' : 'Player 1';
      isInputEnabled = true;
      timeLeft = roundTimeSeconds;
    });
    startTurn();
  }

  void onLoseRound(String player, String reason) {
    String winner = (player == 'Player 1') ? 'Player 2' : 'Player 1';

    if (winner == 'Player 1') {
      player1RoundsWon++;
    } else {
      player2RoundsWon++;
    }
    setState(() {
      message = '';
    });

    // Show dialog for round loss
    showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        title: const Text('Round Over'),
        content:
            Text('$player lost the round: $reason.\n$winner wins this round!'),
        actions: [
          TextButton(
            child: const Text('Next Round'),
            onPressed: () {
              Navigator.of(context).pop();
              if (player1RoundsWon == roundsToWin ||
                  player2RoundsWon == roundsToWin) {
                showMatchResult();
              } else {
                // Reset for next round
                setState(() {
                  wordChain.clear();
                  currentTurn = 'Player 1';
                  timeLeft = roundTimeSeconds;
                  isInputEnabled = true;
                });
                startTurn();
              }
            },
          ),
        ],
      ),
    );
  }

  void showMatchResult() {
    String winner =
        player1RoundsWon > player2RoundsWon ? 'Player 1' : 'Player 2';

    // Navigate to ResultScreen passing winner and scores
    Navigator.pushReplacementNamed(
      context,
      '/result',
      arguments: {
        'winner': winner,
        'player1Score': player1RoundsWon,
        'player2Score': player2RoundsWon,
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final Color bgColor =
        currentTurn == 'Player 1' ? player1Color : player2Color;

    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        title: const Text('WordLego - Offline Mode'),
        backgroundColor: tealDark,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(50),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text(
                  'Player 1 Wins: $player1RoundsWon',
                  style: const TextStyle(color: Colors.white, fontSize: 16),
                ),
                Text(
                  'Player 2 Wins: $player2RoundsWon',
                  style: const TextStyle(color: Colors.white, fontSize: 16),
                ),
              ],
            ),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              'Theme: ${widget.theme}',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: tealDark,
              ),
            ),
            const SizedBox(height: 12),
            LinearProgressIndicator(
              value: timeLeft / roundTimeSeconds,
              color: orangeAccent,
              backgroundColor: tealLight.withOpacity(0.3),
            ),
            const SizedBox(height: 8),
            Text(
              'Time Left: $timeLeft s',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 16),
            Text(
              '$currentTurn\'s Turn',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: tealDark,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: wordController,
              enabled: isInputEnabled,
              decoration: InputDecoration(
                border: const OutlineInputBorder(),
                hintText: 'Enter your word...',
              ),
              onSubmitted: (_) => submitWord(),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: isInputEnabled ? submitWord : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: orangeAccent,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                child: const Text(
                  'Submit Word',
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              message,
              style: TextStyle(color: orangeAccent, fontSize: 16),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: wordChain.length,
                itemBuilder: (context, index) {
                  final word = wordChain[index];
                  return ListTile(
                    title: Text(
                      word,
                      style: TextStyle(fontSize: 18, color: tealDark),
                    ),
                    leading: CircleAvatar(
                      backgroundColor: orangeAccent,
                      child: Text(
                        '${index + 1}',
                        style: const TextStyle(color: Colors.white),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

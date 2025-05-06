import 'package:flutter/material.dart';

class ThemeSelectionScreen extends StatefulWidget {
  const ThemeSelectionScreen({Key? key}) : super(key: key);

  @override
  State<ThemeSelectionScreen> createState() => _ThemeSelectionScreenState();
}

class _ThemeSelectionScreenState extends State<ThemeSelectionScreen> {
  final Color backgroundColor = const Color(0xFFFDFBEE);
  final Color tealLight = const Color(0xFF57B4BA);
  final Color tealDark = const Color(0xFF015551);
  final Color orangeAccent = const Color(0xFFFE4F2D);

  final List<String> themes = [
    'Animals',
    'Countries',
    'Tech',
    'Food',
    'Sports',
    'Nature',
  ];

  String? selectedTheme;
  String? mode;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Get the passed mode from arguments
    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    mode = args?['mode'] ?? 'two_player'; // default to 'two_player' if missing
  }

  void onThemeSelected(String theme) {
    setState(() {
      selectedTheme = theme;
    });
  }

  void onStartGame() {
    if (selectedTheme != null && mode != null) {
      Navigator.pushNamed(
        context,
        '/game',
        arguments: {
          'mode': mode!,
          'theme': selectedTheme!,
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final double width = MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: backgroundColor,
      appBar: AppBar(
        backgroundColor: tealDark,
        title: const Text('Select Theme'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              'Choose a theme for your game',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: tealDark,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: GridView.count(
                crossAxisCount: width > 400 ? 3 : 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: themes.map((theme) {
                  bool isSelected = theme == selectedTheme;
                  return GestureDetector(
                    onTap: () => onThemeSelected(theme),
                    child: Container(
                      decoration: BoxDecoration(
                        color: isSelected
                            ? orangeAccent
                            : tealLight.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSelected ? orangeAccent : Colors.transparent,
                          width: 2,
                        ),
                        boxShadow: [
                          if (isSelected)
                            BoxShadow(
                              color: orangeAccent.withOpacity(0.5),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                        ],
                      ),
                      child: Center(
                        child: Text(
                          theme,
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: isSelected ? Colors.white : tealDark,
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: selectedTheme == null ? null : onStartGame,
                style: ElevatedButton.styleFrom(
                  backgroundColor: orangeAccent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: Text(
                  'Start Game',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color:
                        selectedTheme == null ? Colors.white54 : Colors.white,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

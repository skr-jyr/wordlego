import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  // Colors from the palette
  final Color backgroundColor = const Color(0xFFFDFBEE);
  final Color tealLight = const Color(0xFF57B4BA);
  final Color tealDark = const Color(0xFF015551);
  final Color orangeAccent = const Color(0xFFFE4F2D);

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _animation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onPlayVsAI() {
    // Navigate or trigger Play vs AI
  }

  void _onTwoPlayerMode() {
    // Navigate to GameScreen with mode set to 'two_player' and a selected theme
    Navigator.pushNamed(context, '/theme-selection', arguments: {
      'mode': 'two_player',
      'theme':
          'Default Theme', // Replace with the actual selected theme if applicable
    });
  }

  void _onSettings() {
    // Show settings modal or screen
    showModalBottomSheet(
        context: context,
        backgroundColor: backgroundColor,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
        ),
        builder: (context) {
          bool themeDark = false;
          bool soundOn = true;
          String difficulty = "Normal";

          return StatefulBuilder(builder: (context, setModalState) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 40,
                    height: 5,
                    decoration: BoxDecoration(
                      color: tealDark.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 15),
                  Text('Settings',
                      style: TextStyle(
                          color: tealDark,
                          fontSize: 22,
                          fontWeight: FontWeight.bold)),
                  const SizedBox(height: 20),
                  SwitchListTile(
                    title:
                        Text('Dark Theme', style: TextStyle(color: tealDark)),
                    value: themeDark,
                    onChanged: (val) {
                      setModalState(() {
                        themeDark = val;
                      });
                    },
                    activeColor: orangeAccent,
                  ),
                  SwitchListTile(
                    title: Text('Sound', style: TextStyle(color: tealDark)),
                    value: soundOn,
                    onChanged: (val) {
                      setModalState(() {
                        soundOn = val;
                      });
                    },
                    activeColor: orangeAccent,
                  ),
                  ListTile(
                    title:
                        Text('Difficulty', style: TextStyle(color: tealDark)),
                    trailing: DropdownButton<String>(
                      value: difficulty,
                      items: <String>['Easy', 'Normal', 'Hard']
                          .map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value, style: TextStyle(color: tealDark)),
                        );
                      }).toList(),
                      onChanged: (String? newVal) {
                        if (newVal != null) {
                          setModalState(() {
                            difficulty = newVal;
                          });
                        }
                      },
                      underline: Container(),
                      dropdownColor: backgroundColor,
                    ),
                  ),
                  const SizedBox(height: 15),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: orangeAccent,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18)),
                      minimumSize: const Size(double.infinity, 45),
                    ),
                    child: const Text('Close', style: TextStyle(fontSize: 16)),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            );
          });
        });
  }

  @override
  Widget build(BuildContext context) {
    // Responsive sizing helpers
    final double width = MediaQuery.of(context).size.width;
    final double height = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Logo text
              Text(
                'WordLego',
                style: TextStyle(
                  color: orangeAccent,
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                  shadows: [
                    Shadow(
                      offset: const Offset(1, 1),
                      blurRadius: 3,
                      color: tealDark.withOpacity(0.5),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),

              // Animated mascot - simple bouncing lego block icon
              ScaleTransition(
                scale: _animation,
                child: Icon(
                  Icons.extension, // Lego block icon
                  color: tealDark,
                  size: height * 0.15,
                ),
              ),

              const SizedBox(height: 30),

              // Play vs AI button
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: orangeAccent,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text(
                    'Play vs AI',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  onPressed: _onPlayVsAI,
                ),
              ),

              const SizedBox(height: 20),

              // Two Player Mode button
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: tealLight,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text(
                    'Two Player Mode',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  onPressed: _onTwoPlayerMode,
                ),
              ),

              const SizedBox(height: 24),

              // Settings Button smaller sized
              Align(
                alignment: Alignment.centerRight,
                child: TextButton.icon(
                  onPressed: _onSettings,
                  icon: Icon(Icons.settings, color: tealDark),
                  label: Text(
                    'Settings',
                    style: TextStyle(
                      color: tealDark,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),

              const Spacer(),

              // Bottom How to Play tip card
              Container(
                padding: const EdgeInsets.all(16),
                margin: const EdgeInsets.only(bottom: 8),
                decoration: BoxDecoration(
                  color: tealLight.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: tealDark.withOpacity(0.1),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class WordValidator {
  final String _baseUrl =
      'https://api.cohere.ai/v2/generate'; // Example endpoint for Cohere

  /// Checks with Cohere whether the given word is a valid English word and fits the theme.
  /// Returns `true` if valid, `false` otherwise.
  Future<bool> isValidWord(String word, String theme) async {
    final String cohereAPIKey = dotenv.env['COHERE_API_KEY'] ?? '';

    final prompt = '''
Given the word "$word" and the theme "$theme", respond only with "Yes" if:
- "$word" is a valid English word,
- AND "$word" fits the theme.

Respond only with "No" if either condition is false.
''';

    final response = await http.post(
      Uri.parse(_baseUrl),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $cohereAPIKey',
      },
      body: jsonEncode({
        'prompt': prompt,
        'model': 'command-a-03-2025', // Specify the model you want to use
        'max_tokens': 3, // Short response expected
        'temperature': 0, // Deterministic response
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final answer = data['generations'][0]['text']
          as String; // Adjust based on actual response structure
      return answer.toLowerCase().trim().startsWith('yes');
    } else {
      throw Exception(
          'Cohere API error: ${response.statusCode} ${response.body}');
    }
  }
}

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class WordValidator {
  final String _baseUrl =
      'https://api.cohere.ai/v2/chat'; // Use the chat endpoint

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
        'messages': [
          {'role': 'user', 'content': prompt}
        ],
        'model': 'command-a-03-2025', // Specify the model you want to use
        'temperature': 0, // Deterministic response
        'max_tokens': 3, // Short response expected
      }),
    );

    if (response.statusCode == 200) {
      try {
        final data = jsonDecode(response.body);

        // Debugging output: print the whole response to inspect its structure
        print('API Response: $data');

        // Check if 'message' and 'content' keys exist and are not null
        if (data['message'] != null &&
            data['message']['content'] != null &&
            data['message']['content'].isNotEmpty) {
          // Accessing text from the response message, which is now inside an array in 'content'
          final answer = data['message']['content'][0]['text'] as String;
          return answer.toLowerCase().trim().startsWith('yes');
        } else {
          throw Exception(
              'Invalid response structure: No valid "message" or "content" in response');
        }
      } catch (e) {
        // If parsing the response fails, log the error and the full response for debugging
        print('Error while parsing response: $e');
        print('Full response: ${response.body}');
        rethrow; // Re-throw the exception for higher-level handling
      }
    } else {
      // Handle HTTP error response
      print('Cohere API error: ${response.statusCode} ${response.body}');
      throw Exception(
          'Cohere API error: ${response.statusCode} ${response.body}');
    }
  }
}

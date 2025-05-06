import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart'; // Import dotenv

class CohereAPI {
  final String _baseUrl =
      'https://api.cohere.ai/v2/generate'; // Example endpoint for Cohere

  Future<String> getResponse(String prompt) async {
    // Load the API key from the environment variable
    final String cohereAPIKey = dotenv.env['COHERE_API_KEY'] ?? '';

    final response = await http.post(
      Uri.parse(_baseUrl),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $cohereAPIKey',
      },
      body: jsonEncode({
        'prompt': prompt,
        'model': 'command-xlarge-20221108', // Specify the model you want to use
        'max_tokens': 100, // Adjust based on your needs
        'temperature': 0.7, // Adjust for creativity
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['generations'][0]
          ['text']; // Adjust based on actual response structure
    } else {
      throw Exception(
          'Failed to load response: ${response.statusCode} ${response.body}');
    }
  }
}

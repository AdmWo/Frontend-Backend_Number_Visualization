from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS class

app = Flask(__name__)
CORS(app, origins=["http://localhost:8000"])


@app.route('/numbers')
def get_numbers():
    numbers = list(range(1, 1000))
    equation = request.args.get('equation', '')  # Get the equation from the query parameter

    if equation:
        # Evaluate the equation and apply it to each number
        try:
            evaluated_numbers = [eval(equation, {'x': num}) for num in numbers]
            numbers = evaluated_numbers
        except Exception as e:
            return jsonify({'error': str(e)})

    return jsonify(numbers)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

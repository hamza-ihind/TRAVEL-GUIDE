
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route('/api/tours')
def get_tours():
    with open('data/tours.json', 'r') as f:
        tours = json.load(f)
    return jsonify(tours)

@app.route('/api/book', methods=['POST'])
def book_tour():
    booking = request.get_json()
    # TODO: persist booking info (e.g., append to a file or database)
    return jsonify({'status': 'success', 'booking': booking}), 201

if __name__ == '__main__':
    app.run(debug=True)
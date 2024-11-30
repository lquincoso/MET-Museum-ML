import unittest
import json

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from tour.app import app


class TestTourAPI(unittest.TestCase):

    def setUp(self):
        # Setup test client for the Flask app
        self.client = app.test_client()
        self.client.testing = True

    def test_get_galleries(self):
        # Test the '/api/galleries' endpoint to get all galleries
        response = self.client.get('/api/galleries')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIsInstance(data, dict)
        self.assertIn('100', data)

    def test_get_shortest_path_valid(self):
        # Test the '/api/shortest-path' endpoint with valid gallery IDs
        response = self.client.get('/api/shortest-path', query_string={'start': '100', 'end': '101'})
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('path', data)
        self.assertIsInstance(data['path'], list)
        self.assertGreater(len(data['path']), 0)

    def test_get_shortest_path_invalid(self):
        # Test the '/api/shortest-path' endpoint with invalid gallery IDs
        response = self.client.get('/api/shortest-path', query_string={'start': '999', 'end': '888'})
        self.assertEqual(response.status_code, 400)
        
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], "Invalid start or end point")

if __name__ == '__main__':
    unittest.main()

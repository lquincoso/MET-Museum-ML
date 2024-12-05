//
//  TourService.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/29/24.
//

import Foundation

class TourService {
    private let baseUrl = "http://127.0.0.1:5000/tour"
    
    func fetchGalleries() async throws -> [String: Gallery] {
        guard let url = URL(string: "\(baseUrl)/galleries") else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([String: Gallery].self, from: data)
    }
    
    func getShortestPath(start: String, end: String) async throws -> [String] {
        guard var components = URLComponents(string: "\(baseUrl)/shortest-path") else {
            throw URLError(.badURL)
        }
        
        components.queryItems = [
            URLQueryItem(name: "start", value: start),
            URLQueryItem(name: "end", value: end)
        ]
        
        guard let url = components.url else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        let response = try JSONDecoder().decode(PathResponse.self, from: data)
        return response.path
    }
}

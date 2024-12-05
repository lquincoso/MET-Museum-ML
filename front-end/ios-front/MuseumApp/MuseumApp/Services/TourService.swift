//
//  TourService.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/29/24.
//

import Foundation

class TourService {
    private let baseUrl = "http://127.0.0.1:5000/api"
    
    func fetchGalleries() async throws -> [String: Gallery] {
        guard let url = URL(string: "\(baseUrl)/galleries") else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([String: Gallery].self, from: data)
    }
    
    func getShortestPath(start: String, end: String) async throws -> [String] {
        guard let url = URL(string: "\(baseUrl)/shortest-path?start=\(start)&end=\(end)") else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        let response = try JSONDecoder().decode(PathResponse.self, from: data)
        return response.path
    }
}

struct PathResponse: Codable {
    let path: [String]
}

//
//  TourService.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/29/24.
//

import Foundation

class TourService {
    private let baseURL = "http://127.0.0.1:5000/api"
    
    func fetchGalleries() async throws -> [String: Gallery] {
        guard let url = URL(string: "\(baseURL)/galleries") else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        
        if let jsonString = String(data: data, encoding: .utf8) {
            print("Received JSON: \(jsonString)")
        }
        
        do {
            return try JSONDecoder().decode([String: Gallery].self, from: data)
        } catch {
            print("Decoding error: \(error)")
            throw error
        }
    }
    
    func getShortestPath(from start: String, to end: String) async throws -> [String] {
        guard let url = URL(string: "\(baseURL)/shortest-path?start=\(start)&end=\(end)") else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        
        if let jsonString = String(data: data, encoding: .utf8) {
            print("Received Path JSON: \(jsonString)")
        }
        
        do {
            let response = try JSONDecoder().decode(PathResponse.self, from: data)
            return response.path
        } catch {
            print("Path decoding error: \(error)")
            throw error
        }
    }
}

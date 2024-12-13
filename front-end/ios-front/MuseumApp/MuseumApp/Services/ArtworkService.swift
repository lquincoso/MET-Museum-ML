//
//  ArtworkService.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 12/1/24.
//

import Foundation

class ArtworkService {
    private static let baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1"
    
    static func fetchArtworkDetails(imageID: Int) async throws -> [String: String] {
        let urlString = "\(baseUrl)/objects/\(imageID)"
        
        guard let url = URL(string: urlString) else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        let artwork = try JSONDecoder().decode(ArtworkAPI.self, from: data)
        
        return [
            "imageUrl": artwork.primaryImage,
            "title": artwork.title,
            "artist": artwork.artistDisplayName,
            "culture": artwork.culture,
            "year": String(artwork.objectBeginDate)
        ]
    }
    
    static func searchArtworks(query: String) async throws -> [Int] {
        let encodedQuery = query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query
        let urlString = "\(baseUrl)/search?q=\(encodedQuery)"
        
        guard let url = URL(string: urlString) else {
            throw URLError(.badURL)
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        let response = try JSONDecoder().decode(SearchResponse.self, from: data)
        return response.objectIDs ?? []
    }
}

struct SearchResponse: Codable {
    let total: Int
    let objectIDs: [Int]?
}

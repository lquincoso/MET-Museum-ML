//
//  ArtworkStore.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/26/24.
//

import Foundation

@MainActor
class ArtworkStore: ObservableObject {
    @Published var artworks: [Int: Artwork] = [:]
    @Published var isLoading = false
    @Published var error: Error?
    
    func loadArtworks(query: String = "") async {
        isLoading = true
        do {
            let searchQuery = query.isEmpty ? "painting" : query
            let ids = try await ArtworkService.searchArtworks(query: searchQuery)
            var loadedArtworks: [Int: Artwork] = [:]
            
            for id in ids.prefix(10) {
                if let details = try? await ArtworkService.fetchArtworkDetails(imageID: id) {
                    let artwork = Artwork(
                        id: id,
                        primaryImage: details["imageUrl"] ?? "",
                        title: details["title"] ?? "",
                        artistDisplayName: details["artist"] ?? "",
                        culture: details["culture"] ?? "",
                        objectBeginDate: Int(details["year"] ?? "0") ?? 0
                    )
                    loadedArtworks[id] = artwork
                }
            }
            
            self.artworks = loadedArtworks
        } catch {
            self.error = error
        }
        isLoading = false
    }
    
    func searchArtworks(_ query: String) async {
        await loadArtworks(query: query)
    }
}

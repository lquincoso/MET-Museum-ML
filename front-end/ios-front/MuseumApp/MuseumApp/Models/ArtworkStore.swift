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
    
    func loadArtworks(query: String = "painting") async {
        isLoading = true
        do {
            let ids = try await ArtworkService.searchArtworks(query: query)
            var loadedArtworks: [Int: Artwork] = [:]
            
            let filteredIds = ids.filter { $0 >= 436500 && $0 <= 436510 }
            
            for id in filteredIds {
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
}

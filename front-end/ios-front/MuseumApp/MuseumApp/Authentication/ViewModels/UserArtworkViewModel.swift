//
//  UserArtworkViewModel.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/26/24.
//

import SwiftUI

@MainActor
class UserArtworkViewModel: ObservableObject {
    @Published var userArtworks: [UserArtwork] = []
    
    func toggleFavorite(artworkId: Int, userId: String) {
        if let index = userArtworks.firstIndex(where: { $0.artworkId == artworkId }) {
            userArtworks[index].isFavorite.toggle()
        } else {
            let userArtwork = UserArtwork(artworkId: artworkId, userId: userId, isFavorite: true)
            userArtworks.append(userArtwork)
        }
        // TODO: Sync with backend
    }
    
    func updateRating(artworkId: Int, userId: String, rating: Int) {
        if let index = userArtworks.firstIndex(where: { $0.artworkId == artworkId }) {
            userArtworks[index].rating = rating
        } else {
            let userArtwork = UserArtwork(artworkId: artworkId, userId: userId, rating: rating)
            userArtworks.append(userArtwork)
        }
        // TODO: Sync with backend
    }
    
    func getUserArtwork(artworkId: Int) -> UserArtwork? {
        return userArtworks.first { $0.artworkId == artworkId }
    }
}

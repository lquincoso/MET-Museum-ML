//
//  UserArtworkStore.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/26/24.
//

import Foundation

class UserArtworkStore: ObservableObject {
    @Published var userArtworks: [UserArtwork] = []
    private let userDefaultsKey = "savedUserArtworks"
    
    init() {
        loadUserArtworks()
    }
    
    func loadUserArtworks() {
        if let data = UserDefaults.standard.data(forKey: userDefaultsKey),
           let decodedArtworks = try? JSONDecoder().decode([UserArtwork].self, from: data) {
            self.userArtworks = decodedArtworks
        }
    }
    
    func saveUserArtworks() {
        if let encodedData = try? JSONEncoder().encode(userArtworks) {
            UserDefaults.standard.set(encodedData, forKey: userDefaultsKey)
        }
    }
    
    func toggleFavorite(artworkId: Int, userId: String) {
        if let index = userArtworks.firstIndex(where: { $0.artworkId == artworkId }) {
            userArtworks[index].isFavorite.toggle()
        } else {
            let userArtwork = UserArtwork(artworkId: artworkId, userId: userId, isFavorite: true)
            userArtworks.append(userArtwork)
        }
        saveUserArtworks()
    }
    
    func updateRating(artworkId: Int, userId: String, rating: Int) {
        if let index = userArtworks.firstIndex(where: { $0.artworkId == artworkId }) {
            userArtworks[index].rating = rating
        } else {
            let userArtwork = UserArtwork(artworkId: artworkId, userId: userId, rating: rating)
            userArtworks.append(userArtwork)
        }
        saveUserArtworks()
    }
    
    func getUserArtwork(artworkId: Int) -> UserArtwork? {
        return userArtworks.first { $0.artworkId == artworkId }
    }
}

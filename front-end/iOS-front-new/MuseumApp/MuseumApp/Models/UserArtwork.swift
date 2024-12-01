//
//  UserArtwork.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/26/24.
//

import Foundation

struct UserArtwork: Identifiable, Codable {
    let id: String
    let artworkId: Int
    let userId: String
    var isFavorite: Bool
    var rating: Int?
    let dateAdded: Date
    
    init(id: String = UUID().uuidString,
         artworkId: Int,
         userId: String,
         isFavorite: Bool = false,
         rating: Int? = nil,
         dateAdded: Date = Date()) {
        self.id = id
        self.artworkId = artworkId
        self.userId = userId
        self.isFavorite = isFavorite
        self.rating = rating
        self.dateAdded = dateAdded
    }
}

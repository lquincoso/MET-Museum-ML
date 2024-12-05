//
//  Gallery.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/29/24.
//

struct Gallery: Codable {
    let name: String
    let coordinates: [Double]
    let neighbors: [String: Double]
    let offsets: [Int]
    let artworks: [GalleryArtwork]
}

struct GalleryArtwork: Codable {
    let objectID: Int
    let title: String?
    let artist: String?
}

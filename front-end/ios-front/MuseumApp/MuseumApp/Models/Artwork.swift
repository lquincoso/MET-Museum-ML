//
//  Artwork.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import Foundation

struct Artwork: Identifiable {
    let id: Int
    let primaryImage: String
    let title: String
    let artistDisplayName: String
    let culture: String
    let objectBeginDate: Int
}

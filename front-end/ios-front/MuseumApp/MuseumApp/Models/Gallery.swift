//
//  Gallery.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/29/24.
//

import Foundation

struct Gallery: Codable {
    let number: String
    let name: String
    let coordinates: [Double]
    let connections: [String]
}

struct PathResponse: Codable {
    let path: [String]
}

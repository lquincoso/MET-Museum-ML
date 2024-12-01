//
//  ExploreView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct ExploreView: View {
    @EnvironmentObject var artworkStore: ArtworkStore
    @State private var searchText = ""
    
    let artworks = [
        Artwork(id: 1, title: "One-dollar Liberty Head Coin", artist: "James Barton Longacre", location: "Gallery 774", description: "Historic American coin design", year: "1849"),
        Artwork(id: 2, title: "Ten-dollar Liberty Head Coin", artist: "Christian Gobrecht", location: "Special Exhibition", description: "Rare numismatic specimen", year: "1838"),
        Artwork(id: 3, title: "Ale Glass", artist: "New England Glass Company", location: "Gallery 774", description: "19th century glassware", year: "1850-1870")
    ]
    
    var body: some View {
        NavigationView {
            VStack {
                SearchBar(text: $searchText)
                
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(filteredArtworks) { artwork in
                            ArtworkCard(artwork: artwork)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Explore")
        }
    }
    
    var filteredArtworks: [Artwork] {
        if searchText.isEmpty {
            return artworkStore.artworks
        } else {
            return artworkStore.artworks.filter { artwork in
                artwork.title.lowercased().contains(searchText.lowercased()) ||
                artwork.artist.lowercased().contains(searchText.lowercased())
            }
        }
    }
}

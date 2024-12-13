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
    
    var body: some View {
        NavigationView {
            if artworkStore.isLoading {
                ProgressView()
            } else {
                ScrollView {
                    LazyVStack(spacing: 16) {
                        
                        SearchBar(text: $searchText)
                        
                        ForEach(filteredArtworks) { artwork in
                            ArtworkCard(artwork: artwork)
                        }
                    }
                    .padding()
                }
                .navigationTitle("Explore")
            }
        }
        .task {
            await artworkStore.loadArtworks()
        }
    }
    var filteredArtworks: [Artwork] {
        if searchText.isEmpty {
            return Array(artworkStore.artworks.values)
        } else {
            return artworkStore.artworks.values.filter { artwork in
                artwork.title.lowercased().contains(searchText.lowercased()) ||
                artwork.artistDisplayName.lowercased().contains(searchText.lowercased())
            }
        }
    }
}

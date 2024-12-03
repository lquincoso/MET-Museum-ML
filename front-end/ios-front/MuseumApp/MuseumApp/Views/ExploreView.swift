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
    
    var filteredArtworks: [Artwork] {
        Array(artworkStore.artworks.values)
    }
    
    var body: some View {
        NavigationView {
            if artworkStore.isLoading {
                ProgressView()
            } else {
                ScrollView {
                    LazyVStack(spacing: 16) {
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
}

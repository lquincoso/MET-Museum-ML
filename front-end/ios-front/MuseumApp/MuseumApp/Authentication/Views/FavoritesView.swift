//
//  FavoritesView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/26/24.
//

import SwiftUI

struct FavoritesView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @EnvironmentObject var userArtworkStore: UserArtworkStore
    @EnvironmentObject var artworkStore: ArtworkStore
    
    var favoriteArtworks: [Artwork] {
        artworkStore.artworks.filter { artwork in
            userArtworkStore.getUserArtwork(artworkId: artwork.id)?.isFavorite == true
        }
    }
    
    var body: some View {
        NavigationStack {  // Changed from NavigationView
            VStack {  // Added VStack
                if favoriteArtworks.isEmpty {
                    VStack(spacing: 20) {
                        Image(systemName: "heart.slash")
                            .font(.system(size: 50))
                            .foregroundColor(MetColors.red)
                        
                        Text("No Favorites Yet")
                            .font(MetFonts.titleMedium)
                        
                        Text("Start exploring artworks and tap the heart to add them to your favorites.")
                            .font(MetFonts.body)
                            .foregroundColor(MetColors.textSecondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }
                } else {
                    ScrollView {
                        LazyVStack(spacing: 16) {
                            ForEach(favoriteArtworks) { artwork in
                                ArtworkCard(artwork: artwork)
                            }
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("Favorites")
        }
    }
}

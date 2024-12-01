//
//  ArtworkCard.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct ArtworkCard: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @EnvironmentObject var userArtworkStore: UserArtworkStore
    let artwork: Artwork
    
    @State private var animatingHeart = false
    
    private var userArtwork: UserArtwork? {
        userArtworkStore.getUserArtwork(artworkId: artwork.id)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Rectangle()
                .fill(Color(.systemGray5))
                .frame(height: 200)
                .overlay(
                    Text("Artwork Image")
                        .foregroundColor(.gray)
                )
            
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(artwork.title)
                        .font(MetFonts.body)
                        .fontWeight(.semibold)
                    
                    Spacer()
                    
                    Button {
                        if let userId = authViewModel.user?.email {
                            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                                animatingHeart = true
                                userArtworkStore.toggleFavorite(artworkId: artwork.id, userId: userId)
                            }
                            
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                withAnimation {
                                    animatingHeart = false
                                }
                            }
                        }
                    } label: {
                        Image(systemName: userArtwork?.isFavorite == true ? "heart.fill" : "heart")
                            .foregroundColor(userArtwork?.isFavorite == true ? .red : .gray)
                            .scaleEffect(animatingHeart ? 1.3 : 1.0)
                            .rotationEffect(animatingHeart ? .degrees(20) : .degrees(0))
                    }
                }
                
                Text(artwork.artist)
                    .font(MetFonts.body)
                    .foregroundColor(MetColors.textSecondary)
                
                HStack {
                    Image(systemName: "mappin.circle.fill")
                    Text(artwork.location)
                }
                .font(MetFonts.body)
                .foregroundColor(MetColors.textSecondary)
                
                if let userId = authViewModel.user?.email {
                    StarRating(
                        rating: userArtwork?.rating ?? 0,
                        maxRating: 5
                    ) { newRating in
                        userArtworkStore.updateRating(
                            artworkId: artwork.id,
                            userId: userId,
                            rating: newRating
                        )
                    }
                    .padding(.top, 4)
                }
            }
            .padding()
        }
        .background(Color.white)
        .cornerRadius(12)
        .shadow(radius: 4)
        .scaleEffect(animatingHeart ? 1.02 : 1.0)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: animatingHeart)
    }
}

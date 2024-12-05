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
    @State private var isSearching = false
    
    var filteredArtworks: [Artwork] {
        let artworks = Array(artworkStore.artworks.values)
        if searchText.isEmpty {
            return artworks
        }
        return artworks.filter { artwork in
            artwork.title.lowercased().contains(searchText.lowercased()) ||
            artwork.artistDisplayName.lowercased().contains(searchText.lowercased())
        }
    }
    
    var body: some View {
        NavigationView {
            VStack {
                HStack {
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.gray)
                        
                        TextField("Search artworks...", text: $searchText)
                            .textFieldStyle(MetTextFieldStyle())
                            .autocapitalization(.none)
                        
                        if !searchText.isEmpty {
                            Button(action: {
                                searchText = ""
                            }) {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(.gray)
                            }
                        }
                    }
                    .padding(8)
                    .background(Color(.systemGray6))
                    .cornerRadius(10)
                }
                .padding(.horizontal)
                
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
                }
            }
            .navigationTitle("Explore")
        }
        .task {
            await artworkStore.loadArtworks()
        }
    }
}

//
//  ContentView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/20/24.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var authViewModel = AuthViewModel()
    @StateObject private var userArtworkStore = UserArtworkStore()
    @StateObject private var artworkStore = ArtworkStore()
    
    var body: some View {
        Group {
            if authViewModel.isAuthenticated {
                MuseumTabView()
                    .environmentObject(authViewModel)
                    .environmentObject(userArtworkStore)
                    .environmentObject(artworkStore)
            } else {
                LoginView()
                    .environmentObject(authViewModel)
            }
        }
    }
}

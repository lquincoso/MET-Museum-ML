//
//  TourViewModel.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/29/24.
//

import SwiftUI
import MapKit

@MainActor
class TourViewModel: ObservableObject {
    private let service = TourService()
    
    @Published var galleries: [String: Gallery] = [:]
    @Published var path: [String] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    func loadGalleries() async {
        isLoading = true
        do {
            galleries = try await service.fetchGalleries()
            print("Successfully loaded \(galleries.count) galleries")
            isLoading = false
        } catch {
            print("Error loading galleries: \(error)")
            errorMessage = "Failed to load galleries: \(error.localizedDescription)"
            isLoading = false
        }
    }
    
    func findShortestPath(from start: String, to end: String) async {
        isLoading = true
        do {
            path = try await service.getShortestPath(from: start, to: end)
            print("Found path with \(path.count) steps")
            isLoading = false
        } catch {
            print("Error finding path: \(error)")
            errorMessage = "Failed to find path: \(error.localizedDescription)"
            isLoading = false
        }
    }
}

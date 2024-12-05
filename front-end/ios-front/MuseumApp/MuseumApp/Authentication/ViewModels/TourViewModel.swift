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
    private let tourService = TourService()
    
    @Published var galleries: [String: Gallery] = [:]
    @Published var path: [String] = []
    @Published var isLoading = false
    @Published var error: Error?
    
    func loadGalleries() async {
        isLoading = true
        do {
            galleries = try await tourService.fetchGalleries()
        } catch {
            self.error = error
        }
        isLoading = false
    }
    
    func findPath(start: String, end: String) async {
        isLoading = true
        do {
            path = try await tourService.getShortestPath(start: start, end: end)
            print("Shortest Path: \(path)")
        } catch {
            self.error = error
        }
        isLoading = false
    }
}

//
//  ToursView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//
// Views/ToursView.swift

import SwiftUI
import MapKit

struct ToursView: View {
    @StateObject private var viewModel = TourViewModel()
    @State private var startGalleryId = ""
    @State private var endGalleryId = ""
    
    private var pathCoordinates: [CLLocationCoordinate2D] {
        viewModel.path.compactMap { galleryId -> CLLocationCoordinate2D? in
            guard let gallery = viewModel.galleries[galleryId] else { return nil }
            return CLLocationCoordinate2D(
                latitude: gallery.coordinates[0],
                longitude: gallery.coordinates[1]
            )
        }
    }
    
    private var annotations: [GalleryAnnotation] {
        var result: [GalleryAnnotation] = []
        
        for (galleryId, gallery) in viewModel.galleries {
            let annotation = GalleryAnnotation(
                id: galleryId,
                coordinate: CLLocationCoordinate2D(
                    latitude: gallery.coordinates[0],
                    longitude: gallery.coordinates[1]
                ),
                markerType: .regular,
                title: gallery.name,
                subtitle: "Gallery ID: \(galleryId)"
            )
            result.append(annotation)
        }
        
        if !viewModel.path.isEmpty {
            if let startGallery = viewModel.galleries[viewModel.path[0]] {
                let startAnnotation = GalleryAnnotation(
                    id: "start",
                    coordinate: CLLocationCoordinate2D(
                        latitude: startGallery.coordinates[0],
                        longitude: startGallery.coordinates[1]
                    ),
                    markerType: .start,
                    title: "Start: \(startGallery.name)"
                )
                result.append(startAnnotation)
            }
            
            if let endGallery = viewModel.galleries[viewModel.path.last!] {
                let endAnnotation = GalleryAnnotation(
                    id: "end",
                    coordinate: CLLocationCoordinate2D(
                        latitude: endGallery.coordinates[0],
                        longitude: endGallery.coordinates[1]
                    ),
                    markerType: .end,
                    title: "End: \(endGallery.name)"
                )
                result.append(endAnnotation)
            }
        }
        
        return result
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Text("Tour")
                    .font(.title)
                    .foregroundColor(MetColors.red)
                
                VStack(alignment: .leading, spacing: 16) {
                    VStack(alignment: .leading) {
                        Text("Start Gallery ID:")
                            .font(.body)
                        TextField("Enter gallery number", text: $startGalleryId)
                            .textFieldStyle(MetTextFieldStyle())
                            .keyboardType(.numberPad)
                    }
                    
                    VStack(alignment: .leading) {
                        Text("End Gallery ID:")
                            .font(.body)
                        TextField("Enter gallery number", text: $endGalleryId)
                            .textFieldStyle(MetTextFieldStyle())
                            .keyboardType(.numberPad)
                    }
                    
                    Button {
                        Task {
                            await viewModel.findPath(start: startGalleryId, end: endGalleryId)
                        }
                    } label: {
                        if viewModel.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else {
                            Text("Find Shortest Path")
                                .font(MetFonts.button)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .background(MetColors.red)
                    .foregroundColor(.white)
                    .cornerRadius(8)
                    .disabled(viewModel.isLoading)
                }
                .padding()
                .background(Color.white)
                .cornerRadius(12)
                
                CustomMapView(
                    pathCoordinates: pathCoordinates,
                    annotations: annotations
                )
                .frame(height: 400)
                .cornerRadius(12)
            }
            .task {
                await viewModel.loadGalleries()
            }
            .alert("Error", isPresented: Binding(
                get: { viewModel.error != nil },
                set: { if !$0 { viewModel.error = nil } }
            )) {
                Button("OK", role: .cancel) {}
            } message: {
                if let error = viewModel.error {
                    Text(error.localizedDescription)
                }
            }
        }
    }
}

//
//  ToursView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI
import MapKit

struct ToursView: View {
    @StateObject private var viewModel = TourViewModel()
    @State private var startGalleryId = ""
    @State private var endGalleryId = ""
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(
            latitude: 40.7794,
            longitude: -73.9632
        ),
        span: MKCoordinateSpan(
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        )
    )
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    Text("Tour")
                        .font(MetFonts.titleLarge)
                        .foregroundColor(MetColors.red)
                    
                    VStack(spacing: 16) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Start Gallery ID:")
                                .font(MetFonts.body)
                            
                            TextField("Enter gallery number", text: $startGalleryId)
                                .textFieldStyle(MetTextFieldStyle())
                                .keyboardType(.numberPad)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("End Gallery ID:")
                                .font(MetFonts.body)
                            
                            TextField("Enter gallery number", text: $endGalleryId)
                                .textFieldStyle(MetTextFieldStyle())
                                .keyboardType(.numberPad)
                        }
                        
                        Button {
                            Task {
                                await viewModel.findShortestPath(
                                    from: startGalleryId,
                                    to: endGalleryId
                                )
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
                    .shadow(radius: 4)
                    
                    Text("Gallery Map")
                        .font(MetFonts.titleMedium)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal)
                    
                    Map(coordinateRegion: $region)
                        .frame(height: 400)
                        .cornerRadius(12)
                        .shadow(radius: 4)
                }
                .padding()
            }
            .navigationTitle("Virtual Tour")
            .background(Color(.systemGray6))
            .task {
                await viewModel.loadGalleries()
            }
            .alert("Error", isPresented: Binding(
                get: { viewModel.errorMessage != nil },
                set: { if !$0 { viewModel.errorMessage = nil } }
            )) {
                Button("OK", role: .cancel) {}
            } message: {
                if let error = viewModel.errorMessage {
                    Text(error)
                }
            }
        }
    }
}

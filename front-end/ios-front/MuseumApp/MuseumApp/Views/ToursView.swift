//
//  ToursView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct ToursView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Virtual Tours")
                    .font(MetFonts.titleMedium)
                    .foregroundColor(MetColors.textPrimary)
                
                Text("Coming Soon")
                    .font(MetFonts.body)
                    .foregroundColor(MetColors.textSecondary)
            }
            .navigationTitle("Tours")
        }
    }
}

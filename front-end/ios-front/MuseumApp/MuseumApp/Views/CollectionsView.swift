//
//  CollectionsView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct CollectionsView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Featured Collections")
                    .font(MetFonts.titleMedium)
                    .foregroundColor(MetColors.textPrimary)
                
                Text("Coming Soon")
                    .font(MetFonts.body)
                    .foregroundColor(MetColors.textSecondary)
            }
            .navigationTitle("Collections")
        }
    }
}

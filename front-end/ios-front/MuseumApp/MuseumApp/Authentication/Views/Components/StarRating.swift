//
//  StarRating.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/26/24.
//

import SwiftUI

struct StarRating: View {
    let rating: Int
    let maxRating: Int
    let onTap: (Int) -> Void
    
    @State private var animatingStars: [Bool] = Array(repeating: false, count: 5)
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(1...maxRating, id: \.self) { star in
                starButton(for: star)
            }
        }
    }
    
    private func starButton(for star: Int) -> some View {
        Button {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                animatingStars[star - 1] = true
                onTap(star)
            }
            
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                withAnimation {
                    animatingStars[star - 1] = false
                }
            }
        } label: {
            Image(systemName: star <= rating ? "star.fill" : "star")
                .foregroundColor(star <= rating ? .yellow : .gray)
                .scaleEffect(animatingStars[star - 1] ? 1.5 : 1.0)
        }
        .buttonStyle(StarButtonStyle())
    }
}

struct StarButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .contentShape(Rectangle())
            .frame(width: 44, height: 44)
    }
}

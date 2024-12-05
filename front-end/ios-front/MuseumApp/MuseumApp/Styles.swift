//
//  Styles.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct MetTextFieldStyle: TextFieldStyle {
    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .font(.custom("OpenSans-Regular", size: 16))
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(8)
    }
}

struct MetColors {
    static let red = Color("MetRed")  // #E4002B
    static let background = Color.white
    static let textPrimary = Color.black
    static let textSecondary = Color.gray
}

struct MetFonts {
    static let titleLarge = Font.custom("PlayfairDisplay-Bold", size: 32)
    static let titleMedium = Font.custom("PlayfairDisplay-SemiBold", size: 24)
    static let body = Font.custom("OpenSans-Regular", size: 16)
    static let button = Font.custom("OpenSans-SemiBold", size: 16)
}

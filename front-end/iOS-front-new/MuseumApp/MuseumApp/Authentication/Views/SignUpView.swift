//
//  SignUpView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct SignUpView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @Environment(\.dismiss) var dismiss
    @FocusState private var focusedField: Field?
    
    enum Field {
        case email
        case password
        case confirmPassword
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                Text("THE MET")
                    .font(MetFonts.titleLarge)
                    .foregroundColor(MetColors.red)
                    .padding(.top, 60)
                
                Text("Create Account")
                    .font(MetFonts.titleMedium)
                    .foregroundColor(MetColors.textPrimary)
                
                VStack(spacing: 16) {
                    TextField("Email", text: $email)
                        .textFieldStyle(MetTextFieldStyle())
                        .textInputAutocapitalization(.never)
                        .keyboardType(.emailAddress)
                        .focused($focusedField, equals: .email)
                        .submitLabel(.next)
                    
                    SecureField("Password", text: $password)
                        .textFieldStyle(MetTextFieldStyle())
                        .focused($focusedField, equals: .password)
                        .submitLabel(.next)
                    
                    SecureField("Confirm Password", text: $confirmPassword)
                        .textFieldStyle(MetTextFieldStyle())
                        .focused($focusedField, equals: .confirmPassword)
                        .submitLabel(.done)
                }
                
                Button {
                    hideKeyboard()
                    Task {
                        await authViewModel.signUp(email: email, password: password, confirmPassword: confirmPassword)
                    }
                } label: {
                    if authViewModel.isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Text("Create Account")
                            .font(MetFonts.button)
                    }
                }
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(MetColors.red)
                .foregroundColor(.white)
                .cornerRadius(8)
                .disabled(authViewModel.isLoading)
                
                Button {
                    hideKeyboard()
                    dismiss()
                } label: {
                    Text("Already have an account? Sign in")
                        .font(MetFonts.body)
                        .foregroundColor(MetColors.red)
                }
            }
            .padding(24)
        }
        .keyboardAdaptive()
        .scrollDismissesKeyboard(.interactively)
        .alert("Error", isPresented: .constant(authViewModel.errorMessage != nil)) {
            Button("OK") {
                authViewModel.errorMessage = nil
            }
        } message: {
            Text(authViewModel.errorMessage ?? "")
        }
        .onSubmit {
            switch focusedField {
            case .email:
                focusedField = .password
            case .password:
                focusedField = .confirmPassword
            case .confirmPassword:
                hideKeyboard()
                Task {
                    await authViewModel.signUp(email: email, password: password, confirmPassword: confirmPassword)
                }
            case .none:
                break
            }
        }
    }
}

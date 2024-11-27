//
//  LoginView.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var email = ""
    @State private var password = ""
    @State private var showingSignUp = false
    @State private var showingAlert = false
    @FocusState private var focusedField: Field?
    
    enum Field {
        case email
        case password
    }
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    Spacer(minLength: 50)
                    
                    Text("THE MET")
                        .font(MetFonts.titleLarge)
                        .foregroundColor(MetColors.red)
                    
                    Text("Sign In")
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
                            .submitLabel(.done)
                    }
                    
                    Button {
                        hideKeyboard()
                        Task {
                            await authViewModel.login(email: email, password: password)
                        }
                    } label: {
                        if authViewModel.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else {
                            Text("Sign In")
                                .font(MetFonts.button)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 48)
                    .background(MetColors.red)
                    .foregroundColor(.white)
                    .cornerRadius(8)
                    .disabled(authViewModel.isLoading)
                    
                    NavigationLink(destination: SignUpView()) {
                        Text("Don't have an account? Sign up")
                            .font(MetFonts.body)
                            .foregroundColor(MetColors.red)
                    }
                    
                    Spacer(minLength: 50)
                }
                .padding(24)
            }
            .keyboardAdaptive()
            .scrollDismissesKeyboard(.interactively)
            .gesture(
                TapGesture()
                    .onEnded { _ in
                        hideKeyboard()
                    }
            )
            .alert("Error", isPresented: .constant(authViewModel.errorMessage != nil)) {
                Button("OK") {
                    authViewModel.errorMessage = nil
                }
            } message: {
                Text(authViewModel.errorMessage ?? "")
            }
            .navigationBarHidden(true)
        }
    }
}

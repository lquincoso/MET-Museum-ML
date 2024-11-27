//
//  AuthViewModel.swift
//  MuseumApp
//
//  Created by Mauricio Piedra on 11/21/24.
//

import SwiftUI

@MainActor
class AuthViewModel: ObservableObject {
    @Published var isAuthenticated = false
    @Published var user: User?
    @Published var errorMessage: String?
    @Published var isLoading = false
    
    struct User {
        let email: String
        let username: String
    }
    
    func login(email: String, password: String) async {
        isLoading = true
        
        try? await Task.sleep(nanoseconds: 1_000_000_000)
        
        // For demo purposes, basic validation
        if email.isEmpty || password.isEmpty {
            errorMessage = "Please fill in all fields"
            isLoading = false
            return
        }
        
        // TODO: Replace with actual API call
        if email.contains("@") && password.count >= 6 {
            // No need for DispatchQueue.main.async because of @MainActor
            self.user = User(email: email, username: email.split(separator: "@").first?.description ?? "")
            self.isAuthenticated = true
            self.isLoading = false
        } else {
            self.errorMessage = "Invalid credentials"
            self.isLoading = false
        }
    }
    
    func signUp(email: String, password: String, confirmPassword: String) async {
        isLoading = true
        
        try? await Task.sleep(nanoseconds: 1_000_000_000)
        
        // Validation
        if email.isEmpty || password.isEmpty || confirmPassword.isEmpty {
            errorMessage = "Please fill in all fields"
            isLoading = false
            return
        }
        
        if password != confirmPassword {
            errorMessage = "Passwords do not match"
            isLoading = false
            return
        }
        
        if !email.contains("@") {
            errorMessage = "Please enter a valid email"
            isLoading = false
            return
        }
        
        if password.count < 6 {
            errorMessage = "Password must be at least 6 characters"
            isLoading = false
            return
        }
        
        // TODO: Replace with actual API call
        self.user = User(email: email, username: email.split(separator: "@").first?.description ?? "")
        self.isAuthenticated = true
        self.isLoading = false
    }
    
    func logout() {
        isAuthenticated = false
        user = nil
    }
}

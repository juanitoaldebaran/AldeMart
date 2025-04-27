package com.project.AldeMart.service;

import com.project.AldeMart.models.User;
import com.project.AldeMart.repository.AuthRepository;
import com.project.AldeMart.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private final AuthRepository authRepository;
    private final JwtUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;
    @Autowired
    public AuthServiceImpl(AuthRepository authRepository, JwtUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public String registerUser(User user) {
        boolean existingUser = authRepository.findUserByEmail(user.getEmail()).isPresent();
        if (existingUser) throw new RuntimeException("Username has already taken");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        authRepository.save(user);
        return "User successfully registered";
    }

    public String authenticateUser(User user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid Credentials");
        }

        User savedUser = authRepository.findUserByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return jwtUtils.generateToken(user);
    }

}

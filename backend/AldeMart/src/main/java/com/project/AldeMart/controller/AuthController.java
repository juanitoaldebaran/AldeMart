package com.project.AldeMart.controller;

import com.project.AldeMart.models.User;
import com.project.AldeMart.service.AuthServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin ("http://localhost:5173")
public class AuthController {

    private  final AuthServiceImpl authService;

    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signInUser(@RequestBody User user) {
        String message = authService.authenticateUser(user);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUpUser(@RequestBody User user) {
        String message = authService.registerUser(user);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
}

package com.project.AldeMart.service;

import com.project.AldeMart.models.User;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    String registerUser(User user);
    String authenticateUser(User user);
}

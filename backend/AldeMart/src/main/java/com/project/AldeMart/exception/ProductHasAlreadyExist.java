package com.project.AldeMart.exception;

public class ProductHasAlreadyExist extends RuntimeException{
    public ProductHasAlreadyExist(String message) {
        super(message);
    }
}

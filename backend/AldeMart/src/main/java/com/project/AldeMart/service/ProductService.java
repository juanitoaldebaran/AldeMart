package com.project.AldeMart.service;

import com.project.AldeMart.models.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    List<Product> getAllProducts();
    Product getProduct(Long productID);
    Product updateProduct(Long productID, Product product);
    void deleteProduct(Long productID);
}

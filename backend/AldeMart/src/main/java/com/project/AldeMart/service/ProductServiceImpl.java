package com.project.AldeMart.service;

import com.project.AldeMart.exception.ProductHasAlreadyExist;
import com.project.AldeMart.exception.ProductNotFoundException;
import com.project.AldeMart.models.Product;
import com.project.AldeMart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @Override
    public Product createProduct(Product product) {
        if (productRepository.existsByProductName(product.getProductName())) {
            throw new ProductHasAlreadyExist("Product already exists with name: " + product.getProductName());
        }

        Product newProduct = productRepository.save(product);
        return newProduct;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> allProducts = productRepository.findAll();
        return allProducts;
    }

    @Override
    public Product getProduct(Long productID) {
        Product getProductByID = productRepository.findById(productID)
                .orElseThrow(() -> new ProductNotFoundException("No product found by ID: " + productID));
        return getProductByID;
    }

    @Override
    public Product updateProduct(Long productID, Product product) {
        Product updatedProduct = productRepository.findById(productID)
                .orElseThrow(() -> new ProductNotFoundException("No product found by ID" + productID));
        updatedProduct.setProductName(product.getProductName());
        updatedProduct.setProductDetails(product.getProductDetails());
        updatedProduct.setProductQuantity(product.getProductQuantity());
        updatedProduct.setProductPrice(product.getProductPrice());
        return productRepository.save(updatedProduct);
    }

    @Override
    public void deleteProduct(Long productID) {
        if (!productRepository.existsByProductID(productID)) {
            throw  new ProductNotFoundException("Product Not Found by ID");
        }
        productRepository.deleteById(productID);
    }
}

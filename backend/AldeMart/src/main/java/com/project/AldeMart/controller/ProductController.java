package com.project.AldeMart.controller;

import com.project.AldeMart.models.Product;
import com.project.AldeMart.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin("http://localhost:3000")
public class ProductController {
    private final ProductServiceImpl productService;

    @Autowired
    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product newProduct = productService.createProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping("/getproducts")
    public ResponseEntity<List<Product>> fetchAllProducts() {
        List<Product> allProducts = productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    @GetMapping("/getproductid/{id}")
    public ResponseEntity<Product> fetchProductByID(@PathVariable("id") Long productID) {
        Product getProductID = productService.getProduct(productID);
        return new ResponseEntity<>(getProductID, HttpStatus.OK);
    }

    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable("id") Long productID, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(productID, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productID) {
        productService.deleteProduct(productID);
        return new ResponseEntity<>("Product successfully deleted",HttpStatus.OK);
    }


}

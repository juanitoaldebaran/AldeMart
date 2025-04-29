package com.project.AldeMart.models;

import jakarta.persistence.*;

@Entity
@Table (name = "product")
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long productID;

    @Column (nullable = false, length = 50, name = "product_name", unique = true)
    private String productName;

    @Column (nullable = false, name = "product_details")
    private String productDetails;

    @Column (nullable = false, name = "product_price")
    private double productPrice;

    @Column (nullable = false, name = "product_quantity")
    private int productQuantity;

    public Product(Long productID, String productName, String productDetails, double productPrice, int productQuantity) {
        this.productID = productID;
        this.productName = productName;
        this.productDetails = productDetails;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }

    public Product() {
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(String productDetails) {
        this.productDetails = productDetails;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }
}

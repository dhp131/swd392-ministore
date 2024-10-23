/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ministore.project.fmvstore.orderdetail;

import jakarta.persistence.Entity;

/**
 *
 * @author toni
 */
@Entity
public class OrderDetail {

    private int orderId;
    private int productId;
    private int quantity;
}

# Admin Panel User Guide

This guide will help you navigate and use the ShopFraz admin panel.

## Getting Started

1. **Login**: Access the admin panel at your admin URL
2. **Login Credentials**: Use your admin email and password
3. **Navigation**: Use the sidebar to navigate between sections

## Dashboard

The dashboard provides an overview of your store's performance:

- **Total Sales**: Sum of all completed orders
- **Total Orders**: Number of orders placed
- **Products**: Total number of products in your store
- **Customers**: Total number of registered customers
- **Recent Orders**: Latest 5 orders with their status

## Products Management

### Adding a Product

1. Click "Products" in the sidebar
2. Click "Add Product" button
3. Fill in the product details:
   - **Name**: Product name (required)
   - **Slug**: URL-friendly identifier (auto-generated from name)
   - **Description**: Product description
   - **Price**: Product price in USD
   - **Stock**: Available quantity
   - **Category**: Select from existing categories
   - **Images**: Upload product images
   - **Featured**: Check to feature on homepage
4. Click "Create Product"

### Editing a Product

1. Go to Products page
2. Find the product you want to edit
3. Click "Edit" button
4. Make your changes
5. Click "Update Product"

### Deleting a Product

1. Go to Products page
2. Find the product you want to delete
3. Click "Delete" button
4. Confirm the deletion

### Uploading Images

1. In the product form, click "Upload Image"
2. Select an image file
3. Wait for upload to complete
4. The image will appear in the product images list
5. Click the X button to remove an image

## Orders Management

### Viewing Orders

1. Click "Orders" in the sidebar
2. View all orders in the table
3. Use search to find specific orders
4. Filter by status using the dropdown

### Updating Order Status

1. Go to Orders page
2. Find the order you want to update
3. Use the status dropdown in the Actions column
4. Select new status:
   - **Pending**: Order placed, awaiting processing
   - **Processing**: Order is being prepared
   - **Shipped**: Order has been shipped
   - **Delivered**: Order delivered to customer
   - **Cancelled**: Order cancelled

## Customers Management

### Viewing Customers

1. Click "Customers" in the sidebar
2. View all registered customers
3. Search for specific customers by email or ID
4. Click on a customer to view their orders

### Customer Orders

- Click on any customer in the list
- View their order history in the right panel
- See order details including status and total

## Inventory Management

### Viewing Inventory

1. Click "Inventory" in the sidebar
2. View all products with stock information
3. See low stock alerts for items below threshold
4. View total stock value

### Stock Alerts

- Products below the low stock threshold are highlighted
- Yellow background indicates low stock
- Red indicates out of stock

## Settings

### Store Information

1. Click "Settings" in the sidebar
2. Update store details:
   - Store name
   - Contact email
   - Phone number
   - Tax rate (%)
3. Click "Save Changes"

### Store Address

1. In Settings, scroll to Store Address section
2. Fill in your store's address:
   - Street address
   - City
   - State
   - ZIP code
   - Country
3. Click "Save Changes"

## Tips

- **Product Images**: Use high-quality images for better presentation
- **Stock Management**: Keep track of inventory to avoid out-of-stock situations
- **Order Status**: Update order status promptly to keep customers informed
- **Settings**: Keep store information up to date

## Troubleshooting

### Can't login?
- Verify you have admin role in Supabase
- Check that your email is correct
- Ensure RLS policies are set correctly

### Images not uploading?
- Verify storage bucket exists and is public
- Check file size (max 50MB)
- Ensure proper CORS configuration

### Orders not showing?
- Verify RLS policies allow admin access
- Check that orders exist in the database
- Refresh the page


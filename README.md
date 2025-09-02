# SMS Credit Reload Feature Prototype

A simple web-based prototype for MikeTango's GoSMS credit reload feature, designed to integrate with QuickBooks for automated quotation generation and SMS credit management.

## Features

### Screen 1: Business Selection
- Dropdown menu to select from available client businesses
- Options include: Silvertree Restaurants, Gordon Grill, Norman's Cafe, Nisha's Boulangerie, Binjai Juice Bar, and Family Onigiri

### Screen 2: Outlets and Top-Up Management
- Displays all outlets under the selected business brand
- Each outlet shows:
  - Outlet name
  - Company/address information
  - Top-up amount input field (pre-populated with default values)
- Real-time total calculation
- Back navigation to return to business selection
- Generate Quotation button to process the SMS credit reload

### Key Functionality
- **Multi-outlet Support**: Each business can have multiple outlets under different companies
- **Individual Credit Management**: SMS credits are charged per company/outlet, not as a whole brand
- **Real-time Calculation**: Total amount updates automatically when top-up values change
- **Quotation Generation**: Simulates creating and sending quotations to client emails
- **Credit Assignment**: Automatically credits SMS to client accounts after quotation generation

## How to Use

1. **Open the Application**: Open `index.html` in a web browser
2. **Select Business**: Choose a business from the dropdown menu
3. **Click Next**: Navigate to the outlets screen
4. **Adjust Top-Up Amounts**: Modify the SMS credit amounts for each outlet as needed
5. **Review Total**: Check the calculated total at the bottom
6. **Generate Quotation**: Click the "Generate Quotation" button
7. **Confirmation**: A success modal will confirm quotation generation and credit assignment

## File Structure

```
Assessment_1/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

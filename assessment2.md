# Assessment 2

## Flowchart Overview

The flowchart illustrates the complete SMS Credit Reload feature workflow, including:
- **Happy Path**: Normal user flow from business selection to successful SMS crediting
- **Error Handling**: All possible failure points with appropriate error messages
- **Recovery Mechanisms**: Retry options and fallback procedures
- **Validation Points**: Data integrity checks at each critical step

## Test Cases

### **Test Case 1: Happy Path - Complete Success Flow**
- **Objective**: Verify successful end-to-end SMS credit reload
- **Steps**:
  1. Access business selection screen
  2. Select "Silvertree Restaurants"
  3. Click Next
  4. Verify outlets display with default values (300, 300, 300, 0)
  5. Modify one value to 250
  6. Verify total updates to 850
  7. Click "Generate Quotation"
  8. Verify success message appears
- **Expected Result**: Quotation generated, email sent, SMS credited
- **State Transitions**: Initial → Business Selected → Outlets Displayed → Processing → Success

### **Test Case 2: Business Selection Validation**
- **Objective**: Verify proper validation on business selection screen
- **Steps**:
  1. Load business selection screen
  2. Verify Next button is disabled
  3. Select "- Select -" option
  4. Verify Next button remains disabled
  5. Select "Gordon Grill"
  6. Verify Next button becomes enabled
- **Expected Result**: Next button only enabled with valid business selection
- **State Transitions**: Initial → Initial (invalid) → Business Selected

### **Test Case 3: Data Loading Error Recovery**
- **Objective**: Test error handling when business data fails to load
- **Steps**:
  1. Simulate network failure/API unavailability
  2. Load application
  3. Verify error message appears
  4. Click retry button
  5. Verify application attempts to reload data
- **Expected Result**: Graceful error handling with recovery option
- **State Transitions**: Initial → Error State → Initial (retry)

### **Test Case 4: Invalid Input Validation**
- **Objective**: Test input validation and error messaging
- **Steps**:
  1. Navigate to outlets screen (Silvertree)
  2. Enter negative value (-100) in first outlet
  3. Verify error message appears
  4. Verify field highlighted in red
  5. Enter valid value (200)
  6. Verify error clears and total updates
- **Expected Result**: Invalid inputs rejected with clear feedback
- **State Transitions**: Outlets Displayed → Validation Error → Outlets Displayed

### **Test Case 5: Zero Total Amount Validation**
- **Objective**: Verify prevention of quotation generation with zero total
- **Steps**:
  1. Navigate to outlets screen
  2. Set all outlet values to 0
  3. Verify total shows 0
  4. Click "Generate Quotation"
  5. Verify error message appears
  6. Set one outlet to 100
  7. Verify quotation can now be generated
- **Expected Result**: Quotation blocked until total > 0
- **State Transitions**: Outlets Displayed → Zero Total Error → Outlets Displayed

### **Test Case 6: No Outlets Available**
- **Objective**: Test handling when business has no outlets
- **Steps**:
  1. Select business with no outlets (simulate)
  2. Click Next
  3. Verify error message appears
  4. Verify only back button is available
  5. Click back
  6. Verify return to business selection
- **Expected Result**: Graceful handling of businesses without outlets
- **State Transitions**: Business Selected → No Outlets Error → Initial

### **Test Case 7: Navigation Testing**
- **Objective**: Verify proper navigation between screens
- **Steps**:
  1. Complete business selection
  2. Navigate to outlets screen
  3. Click back arrow
  4. Verify return to business selection with previous selection cleared
  5. Re-select business
  6. Verify outlets screen loads again
- **Expected Result**: Smooth navigation with state management
- **State Transitions**: Business Selected → Outlets Displayed → Initial → Business Selected

### **Test Case 8: Partial System Failure**
- **Objective**: Test partial failure scenarios (email fails but SMS credits)
- **Steps**:
  1. Complete normal flow to quotation generation
  2. Simulate email service failure
  3. Verify warning message appears
  4. Verify SMS crediting continues
  5. Verify partial success notification
- **Expected Result**: Graceful degradation with appropriate messaging
- **State Transitions**: Processing → Partial Failure → Partial Success

### **Test Case 9: Complete System Failure Recovery**
- **Objective**: Test complete quotation generation failure
- **Steps**:
  1. Complete form with valid data
  2. Click "Generate Quotation"
  3. Simulate complete system failure
  4. Verify error message appears
  5. Verify retry button available
  6. Verify form data preserved
  7. Click retry
- **Expected Result**: Form data preserved, retry option available
- **State Transitions**: Processing → Complete Failure → Processing (retry)

### **Test Case 10: Real-time Total Calculation**
- **Objective**: Verify total calculation updates correctly
- **Steps**:
  1. Navigate to outlets screen with default values
  2. Note initial total (900 for Silvertree)
  3. Change first outlet from 300 to 150
  4. Verify total updates to 750
  5. Change second outlet from 300 to 0
  6. Verify total updates to 450
  7. Add 100 to last outlet (from 0 to 100)
  8. Verify total updates to 550
- **Expected Result**: Total updates in real-time with each change
- **State Transitions**: Outlets Displayed (multiple internal state updates)

---

## State Transition Coverage

### **Primary States**:
1. **Initial State** (Business Selection)
2. **Business Selected State** 
3. **Loading State** (Screen transition)
4. **Outlets Display State**
5. **Validation Error State**
6. **Processing State** (Quotation generation)
7. **Success State**
8. **Failure State**
9. **Partial Success State**

### **Transition Coverage Matrix**:

| From State | To State | Test Case(s) | Trigger |
|------------|----------|--------------|---------|
| Initial | Business Selected | TC1, TC2 | Valid business selection |
| Initial | Error | TC3 | Data loading failure |
| Business Selected | Outlets Display | TC1, TC7 | Next button click |
| Business Selected | Initial | TC7 | Back navigation |
| Outlets Display | Validation Error | TC4, TC5 | Invalid input |
| Outlets Display | Processing | TC1, TC8 | Generate quotation |
| Validation Error | Outlets Display | TC4, TC5 | Input correction |
| Processing | Success | TC1 | Successful completion |
| Processing | Failure | TC9 | System failure |
| Processing | Partial Success | TC8 | Partial system failure |
| Success | Initial | TC1 | Process completion |
| Failure | Processing | TC9 | Retry action |
| Partial Success | Initial | TC8 | Process completion |
| Error | Initial | TC3 | Retry action |

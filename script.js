// Business data with outlets
const businessData = {
    silvertree: {
        name: "Silvertree Restaurants",
        outlets: [
            { name: "Binjai Park", address: "Silvertree Ons Sdn Bhd", defaultAmount: 300 },
            { name: "Binjai Park", address: "Silvertree Ons Sdn Bhd", defaultAmount: 300 },
            { name: "Binjai Park", address: "Silvertree Binjai Sdn Bhd", defaultAmount: 300 },
            { name: "Union Square", address: "Silvertree US Sdn Bhd", defaultAmount: 0 }
        ]
    },
    gordon: {
        name: "Gordon Grill",
        outlets: [
            { name: "Gordon Grill Main", address: "Gordon Central Sdn Bhd", defaultAmount: 250 },
            { name: "Gordon Grill Express", address: "Gordon Express Sdn Bhd", defaultAmount: 150 }
        ]
    },
    norman: {
        name: "Norman's Cafe",
        outlets: [
            { name: "Norman's Cafe KLCC", address: "Norman KLCC Sdn Bhd", defaultAmount: 200 },
            { name: "Norman's Cafe Bangsar", address: "Norman Bangsar Sdn Bhd", defaultAmount: 180 }
        ]
    },
    nisha: {
        name: "Nisha's Boulangerie",
        outlets: [
            { name: "Nisha's Mont Kiara", address: "Nisha MK Sdn Bhd", defaultAmount: 120 },
            { name: "Nisha's Pavilion", address: "Nisha Pavilion Sdn Bhd", defaultAmount: 150 }
        ]
    },
    binjai: {
        name: "Binjai Juice Bar",
        outlets: [
            { name: "Binjai Juice Central", address: "Binjai Central Sdn Bhd", defaultAmount: 100 },
            { name: "Binjai Juice Mall", address: "Binjai Mall Sdn Bhd", defaultAmount: 80 }
        ]
    },
    family: {
        name: "Family Onigiri",
        outlets: [
            { name: "Family Onigiri Sunway", address: "Family Sunway Sdn Bhd", defaultAmount: 90 },
            { name: "Family Onigiri 1U", address: "Family 1U Sdn Bhd", defaultAmount: 110 }
        ]
    }
};

// DOM elements
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const businessSelect = document.getElementById('businessSelect');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const selectedBusinessName = document.getElementById('selectedBusinessName');
const outletsList = document.getElementById('outletsList');
const totalAmount = document.getElementById('totalAmount');
const generateQuoteBtn = document.getElementById('generateQuoteBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

let currentBusiness = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // Business selection change
    businessSelect.addEventListener('change', function() {
        if (this.value) {
            nextBtn.disabled = false;
            currentBusiness = this.value;
        } else {
            nextBtn.disabled = true;
            currentBusiness = null;
        }
    });

    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentBusiness) {
            showScreen2();
        }
    });

    // Back button click
    backBtn.addEventListener('click', function() {
        showScreen1();
    });

    // Generate quotation button click
    generateQuoteBtn.addEventListener('click', function() {
        generateQuotation();
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        successModal.classList.remove('active');
        showScreen1();
        resetForm();
    });
}

function showScreen1() {
    screen1.classList.add('active');
    screen2.classList.remove('active');
}

function showScreen2() {
    screen1.classList.remove('active');
    screen2.classList.add('active');
    
    if (currentBusiness && businessData[currentBusiness]) {
        const business = businessData[currentBusiness];
        selectedBusinessName.textContent = business.name;
        populateOutlets(business.outlets);
        calculateTotal();
    }
}

function populateOutlets(outlets) {
    outletsList.innerHTML = '';
    
    outlets.forEach((outlet, index) => {
        const outletDiv = document.createElement('div');
        outletDiv.className = 'outlet-item';
        
        outletDiv.innerHTML = `
            <div class="outlet-info">
                <div class="outlet-name">${outlet.name}</div>
                <div class="outlet-address">${outlet.address}</div>
            </div>
            <input type="number" 
                   class="topup-input" 
                   value="${outlet.defaultAmount}" 
                   min="0" 
                   data-outlet-index="${index}"
                   onchange="calculateTotal()">
        `;
        
        outletsList.appendChild(outletDiv);
    });
}

function calculateTotal() {
    const inputs = document.querySelectorAll('.topup-input');
    let total = 0;
    
    inputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        total += value;
    });
    
    totalAmount.textContent = total;
}

function generateQuotation() {
    const inputs = document.querySelectorAll('.topup-input');
    const business = businessData[currentBusiness];
    let quotationData = {
        business: business.name,
        outlets: [],
        total: 0
    };
    
    inputs.forEach((input, index) => {
        const amount = parseInt(input.value) || 0;
        if (amount > 0) {
            quotationData.outlets.push({
                name: business.outlets[index].name,
                address: business.outlets[index].address,
                amount: amount
            });
            quotationData.total += amount;
        }
    });
    
    // Simulate quotation generation and email sending
    console.log('Generating quotation:', quotationData);
    
    // Show success modal
    setTimeout(() => {
        successModal.classList.add('active');
    }, 500);
}

function resetForm() {
    businessSelect.value = '';
    nextBtn.disabled = true;
    currentBusiness = null;
    outletsList.innerHTML = '';
    totalAmount.textContent = '0';
} 
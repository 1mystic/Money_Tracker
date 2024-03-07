document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.querySelector('form');
    const transactionList = document.querySelector('ul');
  
    // Handle form submission
    transactionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const type = document.querySelector('#type').value;
      const description = document.querySelector('#description').value;
      const amount = document.querySelector('#amount').value;
  
      try {
        const response = await fetch('/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ type, description, amount })
        });
  
        if (response.ok) {
          // Reset form fields
          document.querySelector('#description').value = '';
          document.querySelector('#amount').value = '';
  
          // Reload transactions list
          loadTransactions();
        } else {
          console.error('Failed to create transaction');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    });
  
    // Load transactions from the server
    const loadTransactions = async () => {
      try {
        const response = await fetch('/transactions');
        const transactions = await response.json();
  
        // Clear existing transaction list
        transactionList.innerHTML = '';
  
        // Render transactions
        transactions.forEach(transaction => {
          const li = document.createElement('li');
          li.textContent = `${transaction.type} - ${transaction.description} - ${transaction.amount} - ${new Date(transaction.date).toLocaleString()}`;
          transactionList.appendChild(li);
        });
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    // Initial load of transactions
    loadTransactions();
  });
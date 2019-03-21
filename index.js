//Listen for submit
document.getElementById('load-form').addEventListener('submit', function(e){
    //hide Results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult, 2000);
    e.preventDefault();
});


//Calculate Results
function calculateResult(){
    // e.preventDefault();
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('interest-payment');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100/ 12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //Compute Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //show result
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';


    }else{
        showErrors('Please Check Your Numbers');
    }

    function showErrors(error){
        //hide result
        document.getElementById('results').style.display = 'none';

        //hide loader
        document.getElementById('loading').style.display = 'none';


        //Create a div
        const errorDiv = document.createElement('div');

        //Get Element
        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        //add class
        errorDiv.className = 'alert alert-danger';


        //create text node and append to div
        errorDiv.appendChild(document.createTextNode(error));

        //Insert error before Heading
        card.insertBefore(errorDiv, heading);


        //clear error after 3 seconds
        setTimeout(clearError, 3000);
    }

    //clear error
    function clearError(){
        document.querySelector('.alert').remove();
    }


   
}
document.addEventListener('DOMContentLoaded', () => {
    const calculateRiskBtn = document.getElementById('calculateRiskBtn');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultsSection = document.getElementById('resultsSection');
    const riskResult = document.getElementById('riskResult');
    const advisory = document.getElementById('advisory');
    const contributingFactorsList = document.getElementById('factorsList');

    calculateRiskBtn.addEventListener('click', async () => {
        // Show loading state
        buttonText.textContent = 'Calculating...';
        loadingSpinner.classList.remove('hidden');
        calculateRiskBtn.disabled = true; // Disable button during calculation

        // Collect user inputs
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const bmi = document.getElementById('bmi').value;
        const systolicBp = document.getElementById('systolic_bp').value;
        const diastolicBp = document.getElementById('diastolic_bp').value;
        const smoking = document.getElementById('smoking').value;
        const alcohol = document.getElementById('alcohol').value;
        const physicalActivity = document.getElementById('physical_activity').value;
        const education = document.getElementById('education').value;

        // Create an object with user inputs (keys should match what your ML backend expects)
        const userInputs = {
            age: parseInt(age),
            gender: gender,
            bmi: parseFloat(bmi),
            systolic_bp: parseInt(systolicBp),
            diastolic_bp: parseInt(diastolicBp),
            smoking_status: smoking,
            alcohol_consumption: alcohol,
            physical_activity_level: physicalActivity,
            education_level: education
        };

        // --- MOCK ML PREDICTION LOGIC (Replace with actual API call) ---
        // In a real application, you would send 'userInputs' to your Python ML backend
        // via an API call (e.g., using fetch API to a Flask/FastAPI endpoint).
        // Example:
        /*
        try {
            const response = await fetch('/predict_ncd_risk', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInputs),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // data would contain prediction, probability, and contributing factors
            const prediction = data.prediction; // e.g., 0 or 1
            const probability = data.probability; // e.g., 0.75
            const factors = data.contributing_factors; // e.g., ['Age', 'BMI']

            displayResults(prediction, probability, factors, userInputs);

        } catch (error) {
            console.error("Error during prediction:", error);
            riskResult.className = 'result-box result-high'; // Use error styling
            riskResult.innerHTML = `<p class="text-red-700">Error: Could not get prediction. Please try again.</p>`;
            advisory.innerHTML = `<p class="text-red-700">Details: ${error.message}</p>`;
            contributingFactorsList.innerHTML = ''; // Clear factors
            resultsSection.classList.remove('hidden');
        }
        */

        // Simulate network delay and ML processing
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

        // Mock prediction based on some simple rules for demonstration
        let mockPrediction = 0; // 0 for low risk, 1 for high risk
        let mockProbability = Math.random() * 0.3 + 0.2; // Base probability for low risk
        let mockFactors = [];

        if (userInputs.age > 50 || userInputs.bmi > 28 || userInputs.systolic_bp > 130 || userInputs.diastolic_bp > 85 || userInputs.smoking_status === 'Current' || userInputs.alcohol_consumption === 'Regularly') {
            mockPrediction = 1; // High risk
            mockProbability = Math.random() * 0.4 + 0.6; // Higher probability for high risk
        }

        if (userInputs.age > 50) mockFactors.push('Age');
        if (userInputs.bmi > 28) mockFactors.push('Elevated BMI');
        if (userInputs.systolic_bp > 130 || userInputs.diastolic_bp > 85) mockFactors.push('Blood Pressure');
        if (userInputs.smoking_status === 'Current') mockFactors.push('Smoking');
        if (userInputs.alcohol_consumption === 'Regularly') mockFactors.push('Alcohol Consumption');
        if (userInputs.physical_activity_level === 'Low') mockFactors.push('Low Physical Activity');

        if (mockFactors.length === 0) mockFactors.push('Currently no major contributing factors identified from inputs.');

        // Display results
        displayResults(mockPrediction, mockProbability, mockFactors, userInputs);

        // Reset loading state
        buttonText.textContent = 'Calculate Risk';
        loadingSpinner.classList.add('hidden');
        calculateRiskBtn.disabled = false; // Re-enable button
    });

    function displayResults(prediction, probability, factors, userInputs) {
        // Clear previous results
        riskResult.className = 'result-box'; // Reset classes
        advisory.innerHTML = '';
        contributingFactorsList.innerHTML = '';

        let riskLevelText = "";
        let riskClass = "";
        let advisoryText = "";

        if (prediction === 1) {
            riskLevelText = `High Risk of NCDs (Diabetes/Hypertension)`;
            riskClass = "result-high";
            advisoryText = `Based on your inputs, you have a **higher predicted risk** of developing Non-Communicable Diseases. It's crucial to focus on proactive health management.`;

            if (factors.includes('Age')) advisoryText += ` Your age is a significant factor.`;
            if (factors.includes('Elevated BMI')) advisoryText += ` Managing your BMI through diet and exercise is highly recommended.`;
            if (factors.includes('Blood Pressure')) advisoryText += ` Regularly monitor your blood pressure and consult a doctor if it remains high.`;
            if (factors.includes('Smoking')) advisoryText += ` Quitting smoking is one of the most impactful steps you can take for your health.`;
            if (factors.includes('Alcohol Consumption')) advisoryText += ` Reducing alcohol intake can significantly lower your risk.`;
            if (factors.includes('Low Physical Activity')) advisoryText += ` Incorporate more physical activity into your daily routine.`;

            advisoryText += ` We strongly advise you to **consult your physician** for a comprehensive health check-up and personalized medical advice.`;

        } else {
            riskLevelText = `Low Risk of NCDs (Diabetes/Hypertension)`;
            riskClass = "result-low";
            advisoryText = `Your current inputs suggest a **lower predicted risk** of developing Non-Communicable Diseases. Keep up your healthy habits!`;

            advisoryText += ` Continue to maintain a balanced diet, engage in regular physical activity, and avoid smoking and excessive alcohol. Regular check-ups are always beneficial to maintain good health.`;
        }

        riskResult.classList.add(riskClass);
        riskResult.innerHTML = `
            <p class="text-xl font-bold mb-2">${riskLevelText}</p>
            <p class="text-lg">Probability: <span class="font-semibold">${(probability * 100).toFixed(2)}%</span></p>
        `;

        advisory.innerHTML = `<p>${advisoryText}</p>`;

        factors.forEach(factor => {
            const li = document.createElement('li');
            li.textContent = factor;
            contributingFactorsList.appendChild(li);
        });

        resultsSection.classList.remove('hidden'); // Show the results section
    }
});

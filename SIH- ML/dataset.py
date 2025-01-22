import pandas as pd
import numpy as np

# Parameters
n_samples = 1000
np.random.seed(42)

# Generating synthetic data
temperature = np.random.uniform(1000, 1400, n_samples)  # Temperature in Celsius
pressure = np.random.uniform(980, 1050, n_samples)  # Pressure in hPa
gas_toxicity = np.random.uniform(100, 1000, n_samples)  # Gas toxicity as a fraction
materials = np.random.choice(['Petrol', 'Kerosene', 'Crude Oil', 'Diesel', 'Natural Gas'], n_samples)
quantity = np.random.uniform(100, 1000, n_samples)  # Quantity in liters

# Assuming a synthetic relationship for blast radius
# This is a simplified model for illustration purposes
blast_radius = (
    temperature * 0.3 +
    pressure * 0.2 +
    gas_toxicity * 0.5 +
    quantity * 0.1 +
    np.random.normal(0, 5, n_samples)  # Adding some noise
)

# Creating the DataFrame
data = pd.DataFrame({
    'temperature': temperature,
    'pressure': pressure,
    'gas_toxicity': gas_toxicity,
    'materials': materials,
    'quantity': quantity,
    'blast_radius': blast_radius
})

# Save to CSV
data.to_csv('SIH- ML/data.csv', index=False)
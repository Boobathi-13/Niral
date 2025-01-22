import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Step 1: Load the dataset
data = pd.read_csv('data.csv')

# Step 2: Preprocess the data
# Convert categorical data (e.g., 'materials') into dummy variables
data = pd.get_dummies(data, columns=['materials'], drop_first=True)

# Step 3: Feature selection
features = data.drop(columns=['blast_radius'])
target = data['blast_radius']

# Step 4: Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Step 5: Standardize the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Step 6: Model selection and training
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 7: Model evaluation
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Step 8: Save the trained model and scaler for future use
joblib.dump(model, 'blast_radius_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# To load and use the model for prediction
model = joblib.load('blast_radius_model.pkl')
scaler = joblib.load('scaler.pkl')

# Predicting blast radius for new data (example)
new_data = pd.DataFrame({
    'temperature': [25],
    'pressure': [1013],
    'gas_toxicity': [0.5],
    'quantity': [500],
    'materials_Petrol': [1],  # Adjust based on the one-hot encoded columns
    'materials_Kerosene': [0],
    'materials_Crude Oil': [0],
    'materials_Diesel': [0],
    'materials_Natural Gas': [0]
})

# Ensure new data has the same columns as the training data
new_data = new_data.reindex(columns=features.columns, fill_value=0)

# Standardize the new data
new_data = scaler.transform(new_data)

# Predict the blast radius
predicted_blast_radius = model.predict(new_data)
print(f'Predicted Blast Radius: {predicted_blast_radius[0]}')

import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_regression
from sklearn.pipeline import Pipeline
import joblib
import matplotlib.pyplot as plt

# Step 1: Load the dataset
data = pd.read_csv(r'C:/Users/BOOBATHIRAJA.K.M/Desktop/SIH Upload/SIH- Images/SIH- ML/data.csv')

# Step 2: Preprocess the data
# Separate numeric and categorical columns
numeric_columns = data.select_dtypes(include=['float64', 'int64']).columns
categorical_columns = data.select_dtypes(include=['object']).columns

# Handle missing values for numeric columns
imputer_numeric = SimpleImputer(strategy='mean')
data[numeric_columns] = imputer_numeric.fit_transform(data[numeric_columns])

# Convert categorical data (e.g., 'materials') into dummy variables
data = pd.get_dummies(data, columns=categorical_columns, drop_first=True)

# Step 3: Feature selection
features = data.drop(columns=['blast_radius'])
target = data['blast_radius']

# Step 4: Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Step 5: Standardize the features and feature selection
scaler = StandardScaler()
selector = SelectKBest(score_func=f_regression, k='all')  # Select all features for now

# Step 6: Model selection and training with a pipeline
pipeline = Pipeline([
    ('scaler', scaler),
    ('selector', selector),
    ('model', RandomForestRegressor(random_state=42))
])

# Step 7: Cross-validation and hyperparameter tuning
param_grid = {
    'model__n_estimators': [100, 200, 300],
    'model__max_features': ['sqrt', 'log2', None],
    'model__max_depth': [10, 20, 30, None]
}

grid_search = GridSearchCV(estimator=pipeline, param_grid=param_grid, cv=5, scoring='neg_mean_squared_error', n_jobs=-1)
grid_search.fit(X_train, y_train)
best_model = grid_search.best_estimator_

# Step 8: Model evaluation
y_pred = best_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse}')
print(f'Mean Absolute Error: {mae}')
print(f'R^2 Score: {r2}')

# Step 9: Save the trained model for future use
joblib.dump(best_model, r'C:/Users/BOOBATHIRAJA.K.M/Desktop/SIH Upload/SIH- Images/SIH- ML/blast_radius_model.pkl')

# To load and use the model for prediction
loaded_model = joblib.load(r'C:/Users/BOOBATHIRAJA.K.M/Desktop/SIH Upload/SIH- Images/SIH- ML/blast_radius_model.pkl')

# Predicting blast radius for new data (example)
new_data = pd.DataFrame({
    'temperature': [1200],
    'pressure': [1013],
    'gas_toxicity': [500],
    'quantity': [650],
    'materials_Petrol': [1],  # Adjust based on the one-hot encoded columns
    'materials_Kerosene': [0],
    'materials_Crude Oil': [0],
    'materials_Diesel': [0],
    'materials_Natural Gas': [0]
})

# Ensure new data has the same columns as the training data
new_data = new_data.reindex(columns=features.columns, fill_value=0)

# Standardize and select features for the new data
new_data_transformed = loaded_model.named_steps['scaler'].transform(new_data)
new_data_transformed = loaded_model.named_steps['selector'].transform(new_data_transformed)

# Predict the blast radius
predicted_blast_radius = loaded_model.named_steps['model'].predict(new_data_transformed)
print(f'Predicted Blast Radius: {predicted_blast_radius[0]}')

# Plotting Actual vs Predicted
plt.scatter(y_test, y_pred)
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.title('Actual vs Predicted')
plt.show()
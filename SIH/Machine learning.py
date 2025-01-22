import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sb

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn import metrics
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
from imblearn.over_sampling import RandomOverSampler

import warnings

warnings.filterwarnings('ignore')
df.columns

for col in df.columns:

# Checking if the column contains
# any null values
if df[col].isnull().sum() > 0:
	val = df[col].mean()
	df[col] = df[col].fillna(val)
	
df.isnull().sum().sum()

plt.pie(df['Temperature'].value_counts().values,
		labels = df['Temperature'].value_counts().index,
		autopct='%1.1f%%')
plt.show()

plt.subplots(figsize=(15,8))

for i, col in enumerate(features):
plt.subplot(3,4, i + 1)
sb.distplot(df[col])
plt.tight_layout()
plt.show()

plt.subplots(figsize=(15,8))

for i, col in enumerate(features):
plt.subplot(3,4, i + 1)
sb.boxplot(df[col])
plt.tight_layout()
plt.show()

plt.figure(figsize=(10,10))
sb.heatmap(df.corr() > 0.8,
		annot=True,
		cbar=False)
plt.show()

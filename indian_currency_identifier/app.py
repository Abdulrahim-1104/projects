import os
import base64
import os
import glob

import cv2
from utils import *
from matplotlib import pyplot as plt
import numpy as np

# For Audio
import subprocess
import playsound
import pygame
from gtts import gTTS

# To Open Dialogue box
import tkinter as tk
from tkinter import filedialog

# Importing keras
from keras import backend as K

# Importing Open CV
import cv2 as cv

import tensorflow as tf
# Scikit PreProcessing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.utils import shuffle
# Importing warnings
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Import Keras Python
import keras
from keras.preprocessing import image
from keras.layers import Conv2D, Flatten, Dense, MaxPool2D, MaxPooling2D, Activation, Dropout, BatchNormalization, Input
from keras.models import Sequential, Model, load_model
from keras.utils import np_utils, to_categorical
from keras.callbacks import EarlyStopping, ModelCheckpoint

# Importing time
import time

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('second.html')

@app.route('/process_image', methods=['POST'])
def process_image():
    image = request.files['image']
    # Save the image to a file
    file_path = 'image.jpg'  # Give a unique file name if needed
    image.save(file_path)

    model = load_model('model_final_1.h5')
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Load and preprocess the image
    img = cv.imread(file_path)  # Read the image using OpenCV
    if img is None:
        # Handle the case where the image failed to load
        return render_template('error.html', message='Failed to load image')

    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)  # Convert BGR to RGB
    img = cv.resize(img, (192, 192))
    img = img.astype(np.float32) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension

    classes = model.predict(img, batch_size=16)
    ind = np.argmax(classes)

    # Configure image and audio paths based on the predicted class
    if ind == 0:
        image_path = 'static/Result/currency/10.jpg'
        audio_path = 'static/Result/audio/10.mp3'
        text = '10 Rupees'
    elif ind == 1:
        image_path = 'static/Result/currency/20.jpg'
        audio_path = 'static/Result/audio/20.mp3'
        text = '20 Rupees'
    elif ind == 2:
        image_path = 'static/Result/currency/50.jpg'
        audio_path = 'static/Result/audio/50.mp3'
        text = '50 Rupees'
    elif ind == 3:
        image_path = 'static/Result/currency/100.jpg'
        audio_path = 'static/Result/audio/100.mp3'
        text = '100 Rupees'
    elif ind == 4:
        image_path = 'static/Result/currency/200.jpg'
        audio_path = 'static/Result/audio/200.mp3'
        text = '200 Rupees'
    elif ind == 5:
        image_path = 'static/Result/currency/500.jpg'
        audio_path = 'static/Result/audio/500.mp3'
        text = '500 Rupees'
    elif ind == 6:
        image_path = 'static/Result/currency/2000.jpg'
        audio_path = 'static/Result/audio/2000.mp3'
        text = '2000 Rupees'
    else:
        image_path = 'static/Result/currency/background.png'
        audio_path = 'static/Result/audio/Background.mp3'
        text = 'No Currency Detected'

    return render_template('result.html', image_path=image_path, audio_path=audio_path, text=text)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

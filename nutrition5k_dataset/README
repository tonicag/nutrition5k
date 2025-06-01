# My goals

My goals for this project are:
- classify the ingredients of a dish
- predict macronutrient calories

# The nutrition5k dataset

The nutrition5k dataset consists of images of different dishes from a caffeteria.
The dishes are recorded using 5 cameras, placed in different positions which take pictures/videos of the dish.

For each dish, there are 4 separate videos containg the recording of that dish, which is placed on a spinning plate.

The videos are encoded in .h264 format - I think this is due to the fact that they also contain depth data, 
because I tried once getting depth data from my iPhone camera from a photo in portrait mode.

I created a script that would take every N-th frame from the videos and save it in a folder.

I got around 6 images per video, so about 24 images in total per dish - one of the camera is placed above the dish so only 1 photo for it.


# First approach

First I started with a multi-label classification model that would predict the ingredients present in the dishes.

The problem I first encountered is that the ingredients were very dispersed - there were some ingredients present in only one dish for example.

# Solution

The initial solution was to filter the dishes and to remove ingredients that had the total mass greater than 5% of the total dish mass.

This not really worked, so instead I filtered the dataset by the top 75 ingredient masses which are present in the dataset.

# Results of the multi-label ingredient classification

I created a basic model usng ResNet to get familiar with this kind of problems. I got a decent result,
only training the last few layers of the model + some custom final layers. 

# Dataset Predictions

As is stated in the original paper, there are 2 ways that their model was evaluated.
First one is using direct regression, and the second one is to use portion independent regression.

What this means is that we are not predicting the actual values of the macronutrient calories/mass, and
instead we are predictiong their value per gram of product.


# Multi-Task Heads

In the original Nutrition5k dataset a backbone -InceptionV2- was used in order to train so I researched and seemes like ResNet is pretty outdated
so I found it interesting to use EfficientNet.

I developed some iterations, but could not really see any decent results so far.

I created 2 types of models.

The first one uses:
    - 1 head for the ingredient classifications
    - 1 head for the macronutrient regression
    - 1 head for the total mass of the dish regression
    - 1 head for the total calories regression

The second model uses 1 head for each macronutrient, and for each other specified above.

Each head uses the features from the backbone, and for the moment I tested the approach described in the paper, with 2 FC 4096 layers.

The evaluation is still in progress, but so far I managed to train some models but could not really decide on any concrete results.


I tried using 2 models: "efficientnet_b0" - which is a small one resulting in a 7M parameters model and bigger one "efficientnetv2_rw_m" which is pretty large
having 50M parameters.


For the training I leveraged Google Collab and their A100 gpus.

# The problems I encountered during training

1. I used a scaler for normalizing the data - the data is scaled by this formula ''macronutrient_mass / total_mass_of_dish''. This created some problems because I trained a model for 3-4 hours only to realize that the scaler was scaling the data on 0 mean, meaning I have negative values, and by mistake I used RElu activation on the last regression head output, which totally messed the training.

2. Another problem I encountered and described above is the incosistency of the ingredient classes. There are some ingredients which are more abundent than the others. Moreover, there were some ingredients which are very hard to recognize, such as salt, pepper, olive oil, which I completely removed from the dataset.

3. The loss weights of the MultiHeadLoss (ingredient_weight=0.1, macro_weight=2.0, mass_weight=2.0, calorie_weight=2.0) seemed very hard to find out, especially because I used a larger model, and it takes a long time to train and test this values.

4. Adding the other heads seemed to really impact the performance of the multi label classification of ingredients, because I tried without them and it worked pretty good.

5. In the future iteration I will try to leverage the ingredient classifications in the predictions of the macronutrients. Here I think I will pass them to the macronutrients head, or I will create a separate module which will be fed into the other heads, but I am not sure how will it impact the performance.


# Evaluations

For now, I only used some evaluations from the training, this is a work in progress.
I will create some evaluations for each iteration I will create and discussed above.
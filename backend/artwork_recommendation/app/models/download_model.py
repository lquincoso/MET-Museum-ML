import torch
import torchvision.models as models

# Loading the ResNet50 model with pre-trained weights
model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)

# Saving the model's state dictionary to a file in the models directory
torch.save(model.state_dict(), 'backend/artwork-recommendation/app/models/resnet50_model.pth')
print("Model downloaded and saved to app/models/resnet50_model.pth")

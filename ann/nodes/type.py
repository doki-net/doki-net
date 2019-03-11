# Enum used to identify the activation function of nodes
from enum import Enum
class Type(Enum):
    IDENTITY = 0
    SIGMOID  = 1
    TANH     = 2
    RELU     = 3

# Enum used to identify the activation function of nodes
from enum import Enum
class Type(int, Enum):
    IDENTITY : int = 0
    SIGMOID  : int = 1
    TANH     : int = 2
    RELU     : int = 3

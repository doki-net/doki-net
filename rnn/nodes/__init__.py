from .type import Type
from . import identity
from . import sigmoid
from . import tanh
from . import relu

funcs = {
    Type.IDENTITY : identity,
    Type.SIGMOID  : sigmoid,
    Type.TANH     : tanh,
    Type.RELU     : relu
}

def typeToFunc(i):
    return funcs[i].f

def typeToDFunc(i):
    return funcs[i].df

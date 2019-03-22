import sys
import random
sys.path.append(sys.path[0]+'\\..') # Allow me to import package from 1 directory up

from ann.networkGenerator import generate
from ann.executor import execute
from ann.nodes import *

layers = [ # You can set the activation function of each layer seperatly
    {'count':3, 'type':Type.IDENTITY},
    {'count':5, 'type':Type.SIGMOID},
    {'count':5, 'type':Type.TANH},
    {'count':3, 'type':Type.RELU}
]

# You can also set custom weights and biases expressions
net = generate(layers, weights=lambda: random.random(), biases=lambda: random.random())
print("ins: " + str(net['ins']))
print("outs: " + str(net['outs']))
print("nodes: " + str(net['nodes']))
print("edges: " + str(net['edges']))
print("")

print(execute(net, [1,1]))

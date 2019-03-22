import sys
import random
sys.path.append(sys.path[0]+'\\..') # Allow me to import package from 1 directory up

from rnn.backpropThroughTime import backpropThroughTime
from rnn.executor import execute
from rnn.networkGenerator import generate
from rnn.nodes import *

layers = [ # You can set the activation function of each layer seperatly
    {'count':3, 'type':Type.RELU},
    {'count':5, 'type':Type.RELU},
    {'count':3, 'type':Type.RELU}
]

# You can also set custom weights and biases expressions
net = generate(layers)

execute(net, [0,0,1], new=True, training=True)
print(execute(net, [0,1,1], training=True))
execute(net, [1,0,1], new=True, training=True)
print(execute(net, [0,0,1], training=True))
execute(net, [0,0,1], new=True, training=True)
print(execute(net, [0,0,1], training=True))

stepSize = 0.001

for a in range(10000000):
    for b in range(10):
        results = []
        results.append(execute(net, [0,0,1], new=True, training=True))
        results.append(execute(net, [0,1,1], training=True))
        backpropThroughTime(net, results, [[1,0,0]], stepSize=stepSize)
    for b in range(10):
        results = []
        results.append(execute(net, [1,0,1], new=True, training=True))
        results.append(execute(net, [0,0,1], training=True))
        backpropThroughTime(net, results, [[1,1,0]], stepSize=stepSize)
    for b in range(10):
        results = []
        results.append(execute(net, [0,1,0], new=True, training=True))
        results.append(execute(net, [0,0,1], training=True))
        backpropThroughTime(net, results, [[0,1,1]], stepSize=stepSize)

    if a%1000 == 0:
        execute(net, [0,0,1], new=True)
        print(execute(net, [0,1,1]))
        execute(net, [1,0,1], new=True)
        print(execute(net, [0,0,1]))
        execute(net, [0,1,0], new=True)
        print(execute(net, [0,0,1]))
        print(net['nodes'])

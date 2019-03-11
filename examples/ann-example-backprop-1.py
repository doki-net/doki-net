import sys
sys.path.append(sys.path[0]+'\\..') # Allow me to import package from 1 directory up

from ann.backprop import backprop
from ann.executor import execute
from ann.nodes import *

net = {
    'ins' : 3,
    'outs': 3,
    'nodes':[
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU},
        {'bias':0.1, 'type':Type.RELU}
    ],
    'edges':[
        {'from':0 , 'to':5 , 'weight':0.1},
        {'from':0 , 'to':3 , 'weight':0.1},
        {'from':0 , 'to':4 , 'weight':0.1},
        {'from':1 , 'to':3 , 'weight':0.1},
        {'from':1 , 'to':4 , 'weight':0.1},
        {'from':2 , 'to':3 , 'weight':0.1},
        {'from':2 , 'to':4 , 'weight':0.1},
        {'from':3 , 'to':5 , 'weight':0.1},
        {'from':3 , 'to':6 , 'weight':0.1},
        {'from':3 , 'to':7 , 'weight':0.1},
        {'from':4 , 'to':5 , 'weight':0.1},
        {'from':4 , 'to':6 , 'weight':0.1},
        {'from':4 , 'to':7 , 'weight':0.1}
    ]
}
inputs = [0,0,1]
outputs = [0,1,0]

print(execute(net, inputs))

for _ in range(100000):
    backprop(net, inputs, outputs)

print(execute(net, inputs))

print(net['nodes'])

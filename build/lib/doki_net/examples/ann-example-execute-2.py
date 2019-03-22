import sys
sys.path.append(sys.path[0]+'\\..') # Allow me to import package from 1 directory up

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

input = [1,1,1]

print("expect a result of [0.296, 0.186, 0.186]")
print(execute(net, input))
print(net)

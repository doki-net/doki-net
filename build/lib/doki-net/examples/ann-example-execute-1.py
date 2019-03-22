import sys
sys.path.append(sys.path[0]+'\\..') # Allow me to import package from 1 directory up

from ann.executor import execute
from ann.nodes import *

net = {
    'ins' : 2,
    'outs': 1,
    'nodes':[
        {'bias':0.1, 'type':Type.IDENTITY},
        {'bias':0.1, 'type':Type.IDENTITY},
        {'bias':0.1, 'type':Type.IDENTITY},
        {'bias':0.1, 'type':Type.IDENTITY}
    ],
    'edges':[
        {'from':0 , 'to':2 , 'weight':0.1},
        {'from':1 , 'to':2 , 'weight':0.1},
        {'from':2 , 'to':3 , 'weight':0.1}
    ]
}

input = [1,1]

print("expect a result of [0.132]")
print(execute(net, input))
print(net)

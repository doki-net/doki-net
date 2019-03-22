import sys
sys.path.append(sys.path[0]+'\\..') # Allow me to import package from 1 directory up

from ann.networkGenerator import generate
from ann.executor import execute
from ann.nodes import *

net = generate([{'count':2},{'count':2}])
print("ins: " + str(net['ins']))
print("outs: " + str(net['outs']))
print("nodes: " + str(net['nodes']))
print("edges: " + str(net['edges']))
print("")

print(execute(net, [1,1]))

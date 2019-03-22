import random
from .nodes import *

def generate(layers, weights=lambda: (random.random()-0.5)*2, biases=lambda: (random.random()-0.5)*2, alphas=lambda: (random.random()-0.5)*2):
    ins = layers[0]['count']
    outs = layers[-1]['count']
    nodes = []
    edges = []

    for l in layers:
        for a in range(l['count']):
            if 'type' in l.keys():
                nodes.append({'bias':biases(), 'alpha':alphas(), 'type':l['type']})
            else:
                nodes.append({'bias':biases(), 'alpha':alphas(), 'type':Type.RELU})

    offset = 0
    for l in range(len(layers)-1):
        for a in range(layers[l]['count']):
            for b in range(layers[l+1]['count']):
                edges.append({'from':a+offset, 'to':layers[l]['count']+b+offset, 'weight':weights()})
        offset += layers[l]['count']

    return {'ins':ins, 'outs':outs, 'nodes':nodes, 'edges':edges}

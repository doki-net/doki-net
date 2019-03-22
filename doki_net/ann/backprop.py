from .executor import execute
from .nodes import *

def backprop(net, inputs, outputs, stepSize=0.9):

    results = execute(net, inputs, training=True);

    for a in net['nodes']:
        a['dc'] = 0
    for a in net['edges']:
        a['dc'] = 0

    for a in range(net['outs']):
        net['nodes'][len(net['nodes'])-net['outs']+a]['dc'] = results[a]-outputs[a]

    i=len(net['nodes'])
    for a in net['nodes'][::-1]:
        i -= 1
        a['dc'] *= typeToDFunc(a['type'])(a)
        for b in net['edges']:
            if b['to'] == i:
                b['dc'] += a['dc']*net['nodes'][b['from']]['result']
                net['nodes'][b['from']]['dc'] += a['dc']*b['weight']

    for a in net['nodes']:
        a['bias'] -= a['dc']*stepSize
        del a['dc']
        del a['result']
        del a['value']
        #del a['activated']
    for a in net['edges']:
        a['weight'] -= a['dc']*stepSize
        del a['dc']

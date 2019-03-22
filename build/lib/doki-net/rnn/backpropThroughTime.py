from .executor import execute
from .nodes import *

def backpropThroughTime(net, results, outputs, stepSize=0.001):

    for a in net['nodes']:
        a['dc'] = 0
        a['dc-da'] = 0
    for a in net['edges']:
        a['dc'] = 0

    for t in range(-1,-len(outputs)-1,-1):
        for a in range(net['outs']):
            net['nodes'][len(net['nodes'])-net['outs']+a]['dc'] = results[t][a]-outputs[t][a]

    i=len(net['nodes'])
    for a in net['nodes'][::-1]:
        i -= 1
        for t in range(-1,-len(outputs),-1):
            a['dc-da'] += a['dc']*typeToDFunc(a['type'])(a)*a['results'][t-1]
            a['dc'] += typeToDFunc(a['type'])(a)*a['alpha']*a['dc']
        for b in net['edges']:
            if b['to'] == i:
                for t in range(-1,-len(outputs)-1,-1):
                    b['dc'] += a['dc']*net['nodes'][b['from']]['results'][t]
                net['nodes'][b['from']]['dc'] += a['dc']*b['weight']

    for a in net['nodes']:
        a['bias'] -= a['dc']*stepSize
        a['alpha'] -= a['dc-da']*stepSize
        del a['dc']
        del a['dc-da']
        del a['result']
        del a['value']
        del a['results']
        del a['values']
        #del a['activated']
    for a in net['edges']:
        a['weight'] -= a['dc']*stepSize
        del a['dc']

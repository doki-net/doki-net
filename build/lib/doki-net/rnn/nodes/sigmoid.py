import math

def f(node, training=False):
    node['activated'] = True
    node['value'] += node['bias']
    node['value'] += node['result']*node['alpha']
    node['result'] = 1/(1+math.exp(-node['value']))
    if not training:
        del node['value']
    else:
        node['values'].append(node['value'])
        node['results'].append(node['result'])
    return node
    return node

def df(node):
    return node['result']*(1-node['result'])

import math

def f(node, training=False):
    node['activated'] = True
    node['value'] += node['bias']
    node['result'] = math.tanh(node['value'])
    if not training:
        del node['value']
    return node

def df(node):
    return 1-(node['result']**2)

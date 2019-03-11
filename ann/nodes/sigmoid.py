def f(node, training=False):
    node['activated'] = True
    node['value'] += node['bias']
    node['result'] = 1/(1+math.exp(-node['value']))
    if not training:
        del node['value']
    return node

def df(node):
    return node['result']*(1-node['result'])

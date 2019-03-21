def f(node, training=False):
    node['activated'] = True
    node['value'] += node['bias']
    node['value'] += node['result']*node['alpha']
    node['result'] = node['value']
    if not training:
        del node['value']
    else:
        node['values'].append(node['value'])
        node['results'].append(node['result'])
    return node

def df(node):
    return 1

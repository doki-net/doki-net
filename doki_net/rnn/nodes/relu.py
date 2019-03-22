def f(node, training=False):
    node['activated'] = True
    node['value'] += node['bias']
    node['value'] += node['result']*node['alpha']
    node['result'] = max(0, node['value'])
    if not training:
        del node['value']
    else:
        node['values'].append(node['value'])
        node['results'].append(node['result'])
    return node
    return node

def df(node):
    if node['result'] >= 0:
        return 1
    return 0

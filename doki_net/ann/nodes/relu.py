def f(node, training=False):
    node['activated'] = True
    node['value'] += node['bias']
    node['result'] = max(0, node['value'])
    if not training:
        del node['value']
    return node

def df(node):
    if node['result'] >= 0:
        return 1
    return 0

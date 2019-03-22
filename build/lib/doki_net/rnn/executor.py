from .nodes import *

def execute(net, input, training=False, new=False):
    # Grab variables
    ins   = net['ins']
    outs  = net['outs']
    nodes = net['nodes']
    edges = sorted(net['edges'], key=lambda k:k['from'])

    for n in nodes:
        if new or not 'result' in n:
            n['results'] = []
            n['values'] = []
            n['result'] = 0
        n['value'] = 0
        n['activated'] = False

    for a in range(ins):
        nodes[a]['value'] = input[a]

    for e in edges:
        fn = nodes[e['from']]
        tn = nodes[e['to']]
        if not fn['activated']:
            fn = typeToFunc(fn['type'])(fn, training)
        tn['value'] += fn['result']*e['weight']

    results = []
    for a in range(len(nodes)-outs, len(nodes)):
        if not nodes[a]['activated']:
            nodes[a] = typeToFunc(nodes[a]['type'])(nodes[a], training)
        results.append(nodes[a]['result'])

    for n in nodes:
        del n['activated']

    return results

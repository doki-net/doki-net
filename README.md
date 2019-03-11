# Doki-net

## Examples

Plenty of examples can be found in the aptly named examples folder.

### Structure of nodes and edges

Each node and edge is a JSON object. The structure of each type of node and edge is
shown below:

---

#### ANN:

##### node:

```javascript
{
  "bias"      : 0.0,      // Bias of the node
  "type"      : Type.RELU // Type refers to the activation function of a node and is set using an enum
}
```

##### edge:
```javascript
  "from" : 0     // The index of the node that this edge takes a value from
  "to"   : 1     // The index of the node that this edge sends the value to
  "weight" : 0.1 // The weight of the edge
```

---

#### RNN (Fully-Recurrent):

##### node:

```javascript
{
  "alpha"  : 0.0, // Alpha is the weight of recurrent signal
  "bias"   : 0.0, // Bias of the node
  "type"      : Type.RELU
}
```

---

#### CNN (In-Development):

```javascript

```

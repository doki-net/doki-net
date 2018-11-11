# Monika

### Abstract

Monika is an experimental ML library I(Oliver Fallows) am developing. Monika uses a NEAT neural network structure, meaning that the number of neurons in Monika's networks can change throughout training allowing for more efficient solutions. Monika is optimised using the GAN technique meaning that there is always 2 networks that are the result of the same training.

### Dependencies

I have tried to keep Monika as self dependent as possible but there are some dependencies, found listed below in two categories.

Just using Monika:
 - Node.js
 - npm

Compiling/Developing on Monika:
 - All listed for using Monika
 - bash/equivalent shell
 - gcc compiler

### Calling ANN, RNN and CNN

<ann|rnn|cnn> <network|network file> <use network file> <inputs|inputs file> <use inputs file>

### Structure of a network

A network is stored as a list of values comma separated.

The first value is the number of input nodes, the second is the number of output nodes. The third is the total number of nodes and the 4th is the total number of edges. The rest of the following values are all the values for each of the nodes and then the edges.

#### Structuring inputs

Like network strings inputs are a comma seperated list. The first number is the number of inputs. the rest are the inputs

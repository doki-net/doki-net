import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name='doki-net',
    version='0.1.0.0',
    scripts=['ann','rnn','cnn'] ,
    author="Oliver Fallows",
    author_email="ollyfallows@outlook.com",
    description="A standard neural network implementation",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/doki-net/doki-net",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)",
        "Operating System :: OS Independent",
    ],
 )

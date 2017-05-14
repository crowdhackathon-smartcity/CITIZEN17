from pybitcointools import *

citizenAddr = '17t4vAk36J9oBxU2UgwXmxvsvPsV2NnzV5'
h = history(citizenAddr)

unspent_history = []

for item in h:
    if 'spend' not in item:
        unspent_history.append(item)

print(unspent_history)

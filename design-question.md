# Design Exercise

Q: The base requirements give contributors their SPC tokens immediately. How would you design your contract to vest the awarded tokens instead, i.e. award tokens to users over time, linearly?

A: One way to do this is by adding a token timelock
We can specify timelocks for each specific investors e.g. seed, general and open
If seed investors were able to invest at a better price, it could make sense to lock them in longer so that they don't dump on the later investors

OpenZeppelin has a library for this called "TokenTimelock" that we can use to help us implement this

e.g.
seed = new TokenTimelock(token, address, seedTime);
general = new TokenTimelock(token, address, generalTime);
open = new TokenTimelock(token, address, openTime);

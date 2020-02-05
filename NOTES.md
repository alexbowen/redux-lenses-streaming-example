Notes of actions taken for the lenses coding exercise
-----------------------------------------------------

1. Moved the redux logger middle ware to be added last else it does not work. It is very handy for debugging redux applications in conjunction with chrome plugins.

2. My first observation of the application when running it was that it seemed quite unstable in that I was getting a lot of connectivity problems. Also when i could connect and succesfully subscribe a query, the sheer volume of data coming through (1000's messages a second) meant that it was unworkable to develp the application when it was running. So aside from it being good practice anyway, i decided i would have to write and rely tests to develop against, and only periodically start the app to test changes.

So initially, as there were no existing tests, i wrote a really simple reducer test just so i could check that webpack etc was configured correctly to run a test suite.
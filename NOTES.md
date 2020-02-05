Notes of actions taken for the lenses coding exercise
-----------------------------------------------------

1. Moved the redux logger middle ware to be added last else it does not work. It is very handy for debugging redux applications in conjunction with chrome plugins.

2. My first observation of the application when running it was that it seemed quite unstable in that I was getting a lot of connectivity problems. Also when i could connect and succesfully subscribe a query, the sheer volume of data coming through (1000's messages a second) meant that it was unworkable to develp the application when it was running. So aside from it being good practice anyway, i decided i would have to write and rely tests to develop against, and only periodically start the app to test changes.

So initially, as there were no existing tests, i wrote a really simple reducer test just so i could check that webpack etc was configured correctly to run a test suite.

3. Implement ability to search messages list. The data in the messages seemed to be quite arbitary and mainly numeric so i decided to allow ability to search by message topic. I added the tests and search term filtering of the message list first. For problems decribed in 2, i did not implement any UI at this point.

4. Add the UI for the search functionality. Created new component for the search input. This is a function component and uses the React useRef hook to effectivley manage its state. IMO 90% the components in this app shoul be function components not class components. There is far too much logic in them that can be abstracted and more effectivly tested. Also if function components were used you could prevent a lot of uneccesary re-rendering that might contribute to the performance of the application not seeming great at the moment.

It would have been nice to introduce some enzyme UI tests at this point but i feel there is a lot of component refactoring to do first.

5. I added functionality and test to limit the message list length so i could perform better manual testing of the search functionality as i was quickly hitting 20000 messages+ in the list and the browser stared to become unstable, even crashing at the 30/40k region.
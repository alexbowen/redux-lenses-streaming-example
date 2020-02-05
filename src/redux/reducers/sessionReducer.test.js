import { sessionReducer, INITIAL_STATE, trimListIfMaxSizeReached } from './sessionReducer'
import messages from './messages.mock'

describe('session reducer', () => {

    const searchAction = {
        type: 'SEARCH_MESSAGES'
    }

    it('should return the initial state', () => {
        expect(sessionReducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    it('should filter messages that contain search term', () => {
        searchAction.payload = 'sea'

        expect(sessionReducer({ messages: messages }, searchAction).messages.length).toEqual(8)
        expect(sessionReducer({ messages: messages }, searchAction).filteredMessages.length).toEqual(5)
    })

    it('should not filter messages if search term not present', () => {
        searchAction.payload = 'cucumber'

        expect(sessionReducer({ messages: messages }, searchAction).messages.length).toEqual(8)
        expect(sessionReducer({ messages: messages }, searchAction).filteredMessages.length).toEqual(0)
    })

    it('should not filter messages if no search term', () => {
        searchAction.payload = ''

        expect(sessionReducer({ messages: messages }, searchAction).messages.length).toEqual(8)
        expect(sessionReducer({ messages: messages }, searchAction).filteredMessages.length).toEqual(8)
    })

    it('should trim oldest messages only if max size defined is reached', () => {
        expect(trimListIfMaxSizeReached([1, 2, 3, 4, 5], 5).length).toEqual(5)
        expect(trimListIfMaxSizeReached([1, 2, 3, 4, 5], 3).length).toEqual(3)
        expect(trimListIfMaxSizeReached([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
    })
})

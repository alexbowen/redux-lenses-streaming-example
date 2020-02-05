import { sessionReducer, INITIAL_STATE } from './sessionReducer'

describe('session reducer', () => {

    it('should return the initial state', () => {
        expect(sessionReducer(undefined, {})).toEqual(INITIAL_STATE)
    })
})

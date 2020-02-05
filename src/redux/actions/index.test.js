import { Action } from './index'

describe('searchMessages action', () => {
  it('should dispatch SEARCH_MESSAGES', () => {
    expect(Action.searchMessages()).toEqual({ type: 'SEARCH_MESSAGES', payload: '' })
    expect(Action.searchMessages('search term')).toEqual({ type: 'SEARCH_MESSAGES', payload: 'search term' })
  })
})

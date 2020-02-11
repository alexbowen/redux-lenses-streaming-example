import { timelineReducer, INITIAL_STATE, trimTimeline, sortMessagesByTimestamp, timeAxisDisplay, createNewTimelineGroup, findTimelineGroupIndex } from './timelineReducer'
import messages from './messages.mock'

describe('timeline reducer', () => {

    it('should return the initial state', () => {
        expect(timelineReducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    it('should find group index that a message belongs to', () => {
        expect(findTimelineGroupIndex(
            [
                {
                    start: 1580843113241,
                    end: 1580843114240
                },
                {
                    start: 1580843114241,
                    end: 1580843115240
                },
                {
                    start: 1580843115241,
                    end: 1580843116240
                }
            ],
            1580843114241
        )).toEqual(1)
    })

    it('should trim the timeline to the length needed', () => {
        expect(trimTimeline([1, 2, 3, 4, 5, 6], 5)).toEqual([2, 3, 4, 5, 6])
        expect(trimTimeline([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5])
        expect(trimTimeline([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4])
    })

    it('should sort messages by time ascending', () => {
        expect(sortMessagesByTimestamp(messages)[0].timestamp).toEqual(1580843113241)
        expect(sortMessagesByTimestamp(messages)[messages.length - 1].timestamp).toEqual(1580843113248)
    })

    it('should format timestamp', () => {
        expect(timeAxisDisplay(1580843113241)).toEqual("19.5.13")
    })

    it('should create time group for timeline with start, end and axis display', () => {
        expect(createNewTimelineGroup(1580843113241, 1000)).toEqual({
            display: "19.5.13",
            start: 1580843113241,
            end: 1580843114240
        })
    })
})

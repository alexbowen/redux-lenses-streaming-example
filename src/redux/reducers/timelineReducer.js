import { createReducer } from 'reduxsauce'
import { Type as KafkaType } from 'redux-lenses-streaming'

export const INITIAL_STATE = {
    queue: [],
    grouped: [],
}

const TIMELINE_INTERVAL = 60000 //1min
const TIMELINE_PERIOD = 1200000 //20min

export const getUpdatedTimeline = (timeline, newMessages = [], timelineInterval, timelinePeriod) => {
    if (!newMessages.length) {
        return timeline
    }

    // initialise timeline if it has no messages in it
    if (!timeline.grouped.length) {
        timeline.grouped[0] = createNewTimelineGroup(
            sortMessagesByTimestamp(newMessages)[0].timestamp,
            timelineInterval
        )
    }

    // add new messages to queue and sort queue
    timeline.queue = timeline.queue.concat(newMessages)
    timeline.queue = sortMessagesByTimestamp(timeline.queue)

    const newQueue = []
    let groupIndex = -1

    // process message queue
    timeline.queue.map(message => {

        //if message is in a future timeline group, create group, trim lineline and add message to next queue
        if (message.timestamp > timeline.grouped[timeline.grouped.length - 1].end) {
            
            timeline.grouped.push(createNewTimelineGroup(
                timeline.grouped[timeline.grouped.length - 1].start + timelineInterval,
                timelineInterval
            ))

            timeline.grouped = trimTimeline(timeline.grouped, timelinePeriod / timelineInterval)

            newQueue.push(message)
        }

        // if group exists for message, increment count in topic
        groupIndex = findTimelineGroupIndex(timeline.grouped, message.timestamp)

        if (groupIndex >= 0) {
            if (!timeline.grouped[groupIndex][message.topic]) {
                timeline.grouped[groupIndex][message.topic] = 0
            }

            timeline.grouped[groupIndex][message.topic]++
        } 
    })

    timeline.queue = newQueue

    return timeline
}

export const findTimelineGroupIndex = (timeline, ts) => {
    return timeline.findIndex(group => {
        return ts <= group.end && ts >= group.start
    })
}

export const createNewTimelineGroup = (start, interval) => {
    return {
        start,
        end: start + interval - 1,
        display: timeAxisDisplay(start)
    }
}

export const timeAxisDisplay = timestamp => {
    return `${new Date(timestamp).getHours()}.${new Date(timestamp).getMinutes()}.${new Date(timestamp).getSeconds()}`
}

export const sortMessagesByTimestamp = messageArray => messageArray.sort((a, b) => a.timestamp - b.timestamp)

export const trimTimeline = (timeline, numberAxisTicks) => {
    return timeline.length > numberAxisTicks ? timeline.slice(timeline.length - numberAxisTicks) : timeline
}

const onKafkaMessage = (state, action) => {
    let messages = (action.payload && action.payload.content) || [];
    const timeline = getUpdatedTimeline(Object.assign({}, state), messages, TIMELINE_INTERVAL, TIMELINE_PERIOD)
    return {
        ...state,
        ...timeline,
    }
}

const ACTION_HANDLERS = {
    [KafkaType.KAFKA_MESSAGE]: onKafkaMessage,
}

export const timelineReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS)

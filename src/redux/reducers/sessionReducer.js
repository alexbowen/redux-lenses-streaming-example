import { createReducer } from 'reduxsauce';
import { Type as KafkaType } from 'redux-lenses-streaming';
import { Type } from '../actions';

// import messages from './messages.mock'

export const INITIAL_STATE = {
  heartbeatCount: 0,
  search: '',
  messages: [],
  filteredMessages: [],
  host: '',
  clientId: '',
  user: '',
  password: '',
  message: {}
};

const onUpdateHost = (state, action) => Object.assign({}, state, { host: action.payload });
const onUpdateClientId = (state, action) => Object.assign({}, state, { clientId: action.payload });
const onUpdateUser = (state, action) => Object.assign({}, state, { user: action.payload });
const onUpdatePassword = (state, action) => Object.assign({}, state, { password: action.payload });
const onClearMessages = (state) => Object.assign({}, state, { messages: [] });
const onShowRowDetails = (state, action) => Object.assign({}, state, { message: action.payload });

const onSearchMessages = (state, action) => { 
  return {
    ...state,
    search: action.payload,
    filteredMessages: state.messages.filter(message => message.topic.match(action.payload)),
  }
}

const onConnectSuccess = state => Object.assign({}, state,
  { heartbeatCount: 0 });
const onKafkaHeartbeat = state => Object.assign({}, state,
  { heartbeatCount: state.heartbeatCount + 1 });

const MAX_MESSAGE_LIST_SIZE = 15000

export const trimListIfMaxSizeReached = (list, maxSize) => list.length > maxSize ? list.slice(0, maxSize) : list

const onKafkaMessage = (state, action) => {
  let messages = (action.payload && action.payload.content) || [];
  //messages = messages.map(message => message.value);
  return Object.assign({}, state,
    {
      messages: trimListIfMaxSizeReached(state.messages.concat(messages), MAX_MESSAGE_LIST_SIZE),
      filteredMessages: state.filteredMessages.concat(
        messages.filter(message => message.topic.match(state.search))
      ),
    });
};

// map our types to our handlers
const ACTION_HANDLERS = {
  [Type.UPDATE_HOST]: onUpdateHost,
  [Type.UPDATE_CLIENT_ID]: onUpdateClientId,
  [Type.UPDATE_USER]: onUpdateUser,
  [Type.UPDATE_PASSWORD]: onUpdatePassword,
  [Type.CLEAR_MESSAGES]: onClearMessages,
  [Type.SHOW_ROW_DETAILS]: onShowRowDetails,
  [Type.SEARCH_MESSAGES]: onSearchMessages,
  [KafkaType.KAFKA_HEARTBEAT]: onKafkaHeartbeat,
  [KafkaType.KAFKA_MESSAGE]: onKafkaMessage,
  [KafkaType.CONNECT_SUCCESS]: onConnectSuccess,
};

export const sessionReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);

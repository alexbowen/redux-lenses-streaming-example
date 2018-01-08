import { createReducer } from 'reduxsauce';
import { Type as KafkaType } from 'redux-lenses-streaming';
import { Type } from '../actions';

export const INITIAL_STATE = {
  heartbeatCount: 0,
  host: '',
  clientId: '',
  user: '',
  password: '',
  messages: {},
  sensorKeys: [],
  selectedSensor: '',
};

const onUpdateHost = (state, action) => Object.assign({}, state, { host: action.payload });
const onUpdateClientId = (state, action) => Object.assign({}, state, { clientId: action.payload });
const onUpdateUser = (state, action) => Object.assign({}, state, { user: action.payload });
const onUpdatePassword = (state, action) => Object.assign({}, state, { password: action.payload });
const onUpdateSensor = (state, action) => Object.assign({}, state, { selectedSensor: action.payload });
const onClearMessages = (state, action) => Object.assign({}, state, { messages: {} });

const onConnectSuccess = state => Object.assign({}, state,
  { heartbeatCount: 0 });
const onKafkaHeartbeat = state => Object.assign({}, state,
  { heartbeatCount: state.heartbeatCount + 1 });
const onKafkaMessage = (state, action) => {
  let kafkaMessages = (action.payload && action.payload.content) || [];
  const updatedMessages = Object.assign({}, state.messages);

  kafkaMessages.forEach(m => {
    const message = Object.assign({}, m, { value: JSON.parse(m.value) });
    const sensorId = message.value && message.value.sensorId;

    if (sensorId) {
      updatedMessages[sensorId] = updatedMessages[sensorId] || [];
      updatedMessages[sensorId].push(message);
    }
  });

  return Object.assign({}, state,
    {
      messages: updatedMessages,
      selectedSensor: state.selectedSensor
        || (Object.keys(updatedMessages) && Object.keys(updatedMessages)[0])
        || ''
    });
};

// map our types to our handlers
const ACTION_HANDLERS = {
  [Type.UPDATE_HOST]: onUpdateHost,
  [Type.UPDATE_CLIENT_ID]: onUpdateClientId,
  [Type.UPDATE_USER]: onUpdateUser,
  [Type.UPDATE_PASSWORD]: onUpdatePassword,
  [Type.UPDATE_SELECTED_SENSOR]: onUpdateSensor,
  [Type.CLEAR_MESSAGES]: onClearMessages,
  [KafkaType.KAFKA_HEARTBEAT]: onKafkaHeartbeat,
  [KafkaType.KAFKA_MESSAGE]: onKafkaMessage,
  [KafkaType.CONNECT_SUCCESS]: onConnectSuccess,
};

export const sessionReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);

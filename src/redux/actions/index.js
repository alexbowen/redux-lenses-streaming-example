import { createTypes } from 'reduxsauce';

export const Type = createTypes(`
  UPDATE_HOST
  UPDATE_CLIENT_ID
  UPDATE_USER
  UPDATE_PASSWORD
  CLEAR_MESSAGES
  SHOW_ROW_DETAILS
  SEARCH_MESSAGES
`);

const updateHost = (payload) => ({ type: Type.UPDATE_HOST, payload });
const updateClientId = (payload) => ({ type: Type.UPDATE_CLIENT_ID, payload });
const updateUser = (payload) => ({ type: Type.UPDATE_USER, payload });
const updatePassword = (payload) => ({ type: Type.UPDATE_PASSWORD, payload });
const clearMessages = () => ({ type: Type.CLEAR_MESSAGES });
const showRowDetails = (payload) => ({ type: Type.SHOW_ROW_DETAILS, payload });

const searchMessages = (payload = '') => ({ type: Type.SEARCH_MESSAGES, payload });

export const Action = {
  updateHost,
  updateClientId,
  updateUser,
  updatePassword,
  clearMessages,
  showRowDetails,
  searchMessages
}

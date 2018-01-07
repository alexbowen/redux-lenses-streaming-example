import { createSelector } from 'reselect'

const getSelectedSensor = state => state.session.selectedSensor;
const getAllMessages = (state) => state.session.messages;

export const getSelectedMessages = createSelector(
    [getSelectedSensor, getAllMessages],
    (sensor, messages) => messages[sensor] || []
)
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Table, Column, AutoSizer } from 'react-virtualized';


const stringCellRenderer = (value) => {
  return (<center>{value}</center>);
}

const cellRenderer = (cellData) => {
  const value = Math.round(cellData * 100) / 100;
  return (<center>{value}</center>);
}

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableHeader: false,
      headerHeight: 30,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 30,
      rowCount: 1000,
      scrollToIndex: undefined,
      useDynamicRowHeight: false,
    }
  }

  componentDidUpdate() {
    //this.list.scrollToRow(this.props.messages.length);
  }

  render() {
    const { messages, onCommitMessage } = this.props;

    const rowGetter = ({ index }) => messages[index].value;

    function rowRenderer({
      key,         // Unique key within array of rows
      index,       // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible,   // This row is visible within the List (eg it is not an overscanned row)
      style        // Style object to be applied to row (to position it)
    }) {
      return (
        <tr
          key={key}
          style={style}
          className="message-row ws-message-list"
        >
          <th>{index}</th>
          <td>{JSON.stringify(messages[index].key)}</td>
          <td>{JSON.stringify(messages[index].value)}</td>
          <td>
            <button
              onClick={onCommitMessage.bind(null, messages[index])}
              className="button is-small is-white">
              Commit
            </button>
          </td>
        </tr>
      )
    }

    return (
      <nav className="panel">
        <div className="panel-block">
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                ref="Table"
                headerHeight={30}
                height={300}
                rowCount={messages.length}
                rowHeight={30}
                scrollToIndex={messages.length - 1}
                width={width}
                rowGetter={rowGetter}
              >
                <Column
                  label="Index"
                  cellDataGetter={({ rowData }) => rowData.index}
                  dataKey="index"
                  width={80}
                  cellRenderer={({rowIndex}) => stringCellRenderer(rowIndex+1)}
                />
                <Column
                  label="Sensor ID"
                  dataKey="sensorId"
                  width={100}
                  cellRenderer={({cellData}) => stringCellRenderer(cellData)}
                />
                <Column
                  label="Min Temp"
                  dataKey="minTemperature"
                  width={150}
                  cellRenderer={({ cellData }) => cellRenderer(cellData)}
                />
                <Column
                  label="Max Temp"
                  dataKey="maxTemperature"
                  width={150}
                  cellRenderer={({ cellData }) => cellRenderer(cellData)}
                />
                <Column
                  label="Average Temp"
                  dataKey="avgTemperature"
                  width={150}
                  cellRenderer={({ cellData }) => cellRenderer(cellData)}
                />
                <Column
                  label="Min Humidity"
                  dataKey="minHumidity"
                  width={150}
                  cellRenderer={({ cellData }) => cellRenderer(cellData)}
                />
                <Column
                  label="Max Humidity"
                  dataKey="maxHumidity"
                  width={150}
                  cellRenderer={({ cellData }) => cellRenderer(cellData)}
                />
                <Column
                  width={210}
                  label="Average Humidity"
                  dataKey="avgHumidity"
                  cellRenderer={({ cellData }) => cellRenderer(cellData)}
                  flexGrow={1}
                />
              </Table>
            )}
          </AutoSizer>
        </div>
      </nav>);
  }
}

MessageList.defaultProps = {
};

MessageList.propTypes = {
  onCommitMessage: PropTypes.func
};


export default MessageList;

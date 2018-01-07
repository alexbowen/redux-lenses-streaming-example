import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions as KafkaActions } from 'redux-lenses-streaming';

import Connect from '../components/Connect';
import Publish from '../components/Publish';
import Subscribe from '../components/Subscribe';
import MessageList from '../components/MessageList';
import MessageChart from '../components/MessageChart';
import { getSelectedMessages } from '../selectors/index';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      streamingMessages: []
    };

    this.interval = null;
    this.updateStream = this.updateStream.bind(this);
    this.stopStreaming = this.stopStreaming.bind(this);
  }

  updateStream() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        const { streamingMessages } = this.state;
        const { messages } = this.props;

        if (streamingMessages.length < messages.length) {
          //Add messages one by one
          const message = messages[streamingMessages.length];
          this.setState({ streamingMessages: streamingMessages.concat([message]) })
        }
      }, 1000);
    }
  }

  stopStreaming() {
    if (this.interval) {
      clearInterval(this.interval());
      this.interval = null;
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.messages.length === 0) {
  //     this.stopStreaming();
  //     this.setState({ streamingMessages: [] })
  //   } else if (nextProps.messages.length) {
  //     this.updateStream(nextProps.messages);
  //   }
  // }

  render() {
    const { messages, selectedMessages, commitMessage, selectedSensor } = this.props;
    const { streamingMessages } = this.state;
    const showMessageList = selectedMessages.length ? (
      <div>
        <MessageList messages={selectedMessages} onCommitMessage={commitMessage} />
        <MessageChart messages={selectedMessages} selectedSensor={selectedSensor} />
      </div>

    ) : <div />;

    return (
      <div className="app">
        <div className="columns">
          <div className="column is-one-quarter">
            <Connect />
            <Publish />
          </div>
          <div className="column">
            <Subscribe
              selectedSensor={selectedSensor}
              messages={messages}
              selectedMessages={selectedMessages} />
            {showMessageList}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Defaults and types
 */
MainContainer.defaultProps = {

};

MainContainer.propTypes = {
  selectedSensor: PropTypes.string.isRequired,
};

/**
 * Redux mappings
 */
const mapStateToProps = state => ({
  messages: state.session.messages,
  selectedMessages: getSelectedMessages(state),
  selectedSensor: state.session.selectedSensor,
});

const mapDispatchToProps = dispatch => ({
  commitMessage: (message) => {
    dispatch(KafkaActions.commit(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

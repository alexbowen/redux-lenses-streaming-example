import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Actions as KafkaActions } from 'redux-lenses-streaming';

import Connect from '../components/Connect';
import Publish from '../components/Publish';
import Subscribe from '../components/Subscribe';
import MessageList from '../components/MessageList';
import TrafficChart from '../components/TrafficChart'

const MainContainer = (props) => {
  const { messages, commit } = props

  const [view, setView] = useState('list')
  return (
    <div className="container app">
      <div className="columns">
        <div className="column">
          <Connect />
        </div>
        <div className="column">
          <Publish />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Subscribe />
          {messages.length ? (
            <div className="panel">
              <div className="tabs">
                <ul>
                  <li className={view === 'list' ? "is-active" : ''}><a onClick={() => setView('list')}>Messages</a></li>
                  <li className={view === 'chart' ? "is-active" : ''}><a onClick={() => setView('chart')}>Traffic</a></li>
                </ul>
              </div>
              {view === 'list' ? <MessageList messages={messages} onCommitMessage={commit} /> : <TrafficChart />}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/**
 * Redux mappings
 */
const mapStateToProps = state => ({
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...KafkaActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

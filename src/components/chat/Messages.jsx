// @ts-check

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currentChannelMessagesSelector } from '../../slices/messagesSlice.js';

const Messages = ({ scrollbar }) => {
  const currentChannelMessages = useSelector(currentChannelMessagesSelector);
  const messagesCount = currentChannelMessages.length;

  useEffect(() => {
    scrollbar.current.scrollToBottom();
  }, [scrollbar, messagesCount]);

  return (
    <ul className="list-unstyled text-break">
      {currentChannelMessages.map(({ id, username, body }) => (
        <li key={id}>
          <b>{`${username}: `}</b>
          {body}
        </li>
      ))}
    </ul>
  );
};

export default Messages;

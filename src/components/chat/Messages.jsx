// @ts-check

import React from 'react';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { t } = useTranslation();
  const { censorship } = useSelector((state) => state.app);
  const { currentChannelId, status: channelsStatus } = useSelector((state) => state.channels);
  const {
    byId,
    allIds,
    status,
  } = useSelector((state) => state.messages);

  if (status === 'failed' || channelsStatus === 'failed') {
    return <div>{t('messages.errors.load')}</div>;
  }

  if (status === 'pending') {
    return <div>{t('messages.loading')}</div>;
  }

  const filteredMessages = allIds
    .map((id) => byId[id])
    .filter(({ channelId }) => channelId === currentChannelId);

  if (filteredMessages.length === 0) {
    return <div>{t('messages.noMessages')}</div>;
  }

  return (
    <ul className="list-unstyled text-break">
      {filteredMessages.map(({ id, username, body }) => (
        <li key={id}>
          <b>{`${username}: `}</b>
          {censorship ? filter.clean(body) : body}
        </li>
      ))}
    </ul>
  );
};

export default Messages;

// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Messages = () => {
  const { t } = useTranslation();
  const { currentChannelId, status: channelsStatus } = useSelector((state) => state.channels);
  const {
    byId,
    allIds,
    status,
    error,
  } = useSelector((state) => state.messages);
  const currentChannelMessages = allIds
    .map((id) => byId[id])
    .filter(({ channelId }) => channelId === currentChannelId);

  if (status === 'failed' || channelsStatus === 'failed') {
    if (status === 'failed') toast.error(t(error.message));

    return <div>{t('messages.errors.load')}</div>;
  }

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

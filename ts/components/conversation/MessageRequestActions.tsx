import * as React from 'react';
import classNames from 'classnames';
import { ContactName, Props as ContactNameProps } from './ContactName';
import {
  MessageRequestActionsConfirmation,
  MessageRequestState,
  Props as MessageRequestActionsConfirmationProps,
} from './MessageRequestActionsConfirmation';
import { Intl } from '../Intl';
import { LocalizerType } from '../../types/Util';

export type Props = {
  i18n: LocalizerType;
  onAccept(): unknown;
} & Omit<ContactNameProps, 'module'> &
  Omit<
    MessageRequestActionsConfirmationProps,
    'i18n' | 'state' | 'onChangeState'
  >;

export const MessageRequestActions = ({
  i18n,
  name,
  profileName,
  phoneNumber,
  conversationType,
  isBlocked,
  onBlock,
  onBlockAndDelete,
  onUnblock,
  onDelete,
  onAccept,
}: Props) => {
  const [mrState, setMrState] = React.useState(MessageRequestState.default);

  return (
    <>
      {mrState !== MessageRequestState.default ? (
        <MessageRequestActionsConfirmation
          i18n={i18n}
          onBlock={onBlock}
          onBlockAndDelete={onBlockAndDelete}
          onUnblock={onUnblock}
          onDelete={onDelete}
          name={name}
          profileName={profileName}
          phoneNumber={phoneNumber}
          conversationType={conversationType}
          state={mrState}
          onChangeState={setMrState}
        />
      ) : null}
      <div className="module-message-request-actions">
        <p className="module-message-request-actions__message">
          <Intl
            i18n={i18n}
            id={`MessageRequests--message-${conversationType}${
              isBlocked ? '-blocked' : ''
            }`}
            components={[
              <strong
                key="name"
                className="module-message-request-actions__message__name"
              >
                <ContactName
                  name={name}
                  profileName={profileName}
                  phoneNumber={phoneNumber}
                />
              </strong>,
            ]}
          />
        </p>
        <div className="module-message-request-actions__buttons">
          {isBlocked ? (
            <button
              onClick={() => {
                setMrState(MessageRequestState.unblocking);
              }}
              tabIndex={0}
              className={classNames(
                'module-message-request-actions__buttons__button',
                'module-message-request-actions__buttons__button--accept'
              )}
            >
              {i18n('MessageRequests--unblock')}
            </button>
          ) : (
            <button
              onClick={() => {
                setMrState(MessageRequestState.blocking);
              }}
              tabIndex={0}
              className={classNames(
                'module-message-request-actions__buttons__button',
                'module-message-request-actions__buttons__button--deny'
              )}
            >
              {i18n('MessageRequests--block')}
            </button>
          )}
          <button
            onClick={() => {
              setMrState(MessageRequestState.deleting);
            }}
            tabIndex={0}
            className={classNames(
              'module-message-request-actions__buttons__button',
              'module-message-request-actions__buttons__button--deny'
            )}
          >
            {i18n('MessageRequests--delete')}
          </button>
          {!isBlocked ? (
            <button
              onClick={onAccept}
              tabIndex={0}
              className={classNames(
                'module-message-request-actions__buttons__button',
                'module-message-request-actions__buttons__button--accept'
              )}
            >
              {i18n('MessageRequests--accept')}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

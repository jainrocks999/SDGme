import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {ConfirmModal} from '../shared/components/result-action';
import {useUserState} from '../shared/config/user-context';
import {useModerationDispatch} from '../shared/config/moderation-context';
import {API_URL} from '../shared/config/api';
import Bell from '../assets/bell.svg';
import BellWithRed from '../assets/bell-alerted.svg';
import colors from '../shared/config/colors';

function Moderation() {
  const [count, setCount] = useState(0);
  const [showBell, setShowBell] = useState(false);
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);

  const {MobileToken} = useUserState();
  const dispatchActions = useModerationDispatch();

  const removeItem = (Id) => {
    setRemovedItems((prevState) => [...prevState, Id]);
  };

  const config = {
    headers: {
      'X-API': MobileToken,
    },
  };

  const fetchCount = () => {
    axios
      .get(`${API_URL}/SDGme/api/Action/GetModerationItemCount`, config)
      .then((response) =>
        response.data.Success
          ? setCount(response.data.Count)
          : console.log('GetModerationItems 1 : ', response.data),
      )
      .catch((error) => console.error('GetModerationItemCount :', error));
  };

  const fetchItems = () => {
    axios
      .get(`${API_URL}/SDGme/api/Action/GetModerationItems`, config)
      .then((response) => {
        if (response.data.Success) {
          setItems(response.data.Items);
          setOtherItems(response.data.RecentActions);
        } else {
          Alert.alert(response.data.Message);
        }
      })
      .catch((error) => console.error('GetModerationItems', error));
  };

  const handleBellClick = () => {
    fetchItems();
    setShow(true);
  };

  useEffect(() => {
    if (items) {
      setItems(items.filter((item) => !removedItems.includes(item.Id)));
    }
  }, [removedItems]);

  const moderationContextDispatch = useCallback(() => {
    dispatchActions({
      type: 'set-moderation-count',
      state: count,
    });
  }, [count, dispatchActions]);

  useEffect(() => {
    count >= 1 ? setShowBell(true) : setShowBell(false);
    moderationContextDispatch();
  }, [count, moderationContextDispatch]);

  useEffect(() => {
    fetchCount();
  }, []);

  const change = () => {
    setShow(false);
    fetchItems();
    fetchCount();
    moderationContextDispatch();
  };

  return (
    <>
      <BellContainer onPress={() => handleBellClick()}>
        {showBell ? (
          <BellWithRed width={20} height={20} />
        ) : (
          <Bell width={20} height={20} />
        )}
      </BellContainer>
      {show && (
        <ConfirmModal
          items={items}
          recent={otherItems}
          change={change}
          removeItem={removeItem}
          general
        />
      )}
    </>
  );
}

const BellContainer = styled.TouchableOpacity`
  background-color: ${colors.white};
  padding: 5px 5px;
  border-radius: 5px;
  border: 1px solid black;
  width: 32px;
  height: 32px;
  align-self: center;
  margin-top: -10px;
`;

export default Moderation;

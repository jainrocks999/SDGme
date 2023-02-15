import styled from 'styled-components';

import colors from '../config/colors';

export const MenuItem = styled.TouchableHighlight`
  flex: 1;
  width: 100px;
  height: 50px;
  margin: 0 10px;
  padding: 10px;
  background-color: ${({isActive}) =>
    isActive ? colors.bgBlue : 'transparent'};
  line-height: 30px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const ItemText = styled.Text`
  font-weight: ${({isActive}) => (isActive ? '700' : 'normal')};
  color: ${({isActive}) => (isActive ? colors.black : colors.primaryColor)};
  font-size: 16px;
`;

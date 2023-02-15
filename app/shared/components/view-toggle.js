import * as React from 'react';
import styled from 'styled-components';
import Svg, {Path} from 'react-native-svg';

import colors from '../config/colors';

function IconsView() {
  return (
    <Svg
      fill={colors.primaryColor}
      viewBox="0 0 24 24"
      height="25px"
      width="25px">
      <Path
        fill={colors.primaryColor}
        d="M8 6a2 2 0 11-4 0 2 2 0 014 0zM8 12a2 2 0 11-4 0 2 2 0 014 0zM6 20a2 2 0 100-4 2 2 0 000 4zM14 6a2 2 0 11-4 0 2 2 0 014 0zM12 14a2 2 0 100-4 2 2 0 000 4zM14 18a2 2 0 11-4 0 2 2 0 014 0zM18 8a2 2 0 100-4 2 2 0 000 4zM20 12a2 2 0 11-4 0 2 2 0 014 0zM18 20a2 2 0 100-4 2 2 0 000 4z"
      />
    </Svg>
  );
}

function ItemsView() {
  return (
    <Svg
      baseProfile="tiny"
      viewBox="0 0 24 24"
      fill={colors.primaryColor}
      height="25px"
      width="25px">
      <Path d="M19 17H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zm0-7H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zm0-7H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2z" />
    </Svg>
  );
}

export function ToggleView({toggleView, current, fullyPadded}) {
  return (
    <IconContainer
      onPress={() => toggleView()}
      underlayColor="none"
      fullyPadded={fullyPadded}>
      {current ? <ItemsView /> : <IconsView />}
    </IconContainer>
  );
}

const IconContainer = styled.TouchableHighlight`
  padding: ${(props) =>
    props.fullyPadded ? '10px 10px 10px 10px' : '0 10px 10px 10px'};
  align-self: center;
  margin-right: 10px;
`;

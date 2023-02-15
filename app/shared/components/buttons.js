import styled from 'styled-components';
import colors from '../config/colors';

export const MainButton = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  background-color: ${(props) =>
    props.disabled ? colors.labelGrey : colors.primaryColor};
`;

export const BlueButton = styled.TouchableOpacity`
  width: 100%;
  max-width: 120%;
  align-self: center;
  border-radius: 10px;
  align-items: center;
  height: 35px;
  justify-content: center;
  background: ${colors.primaryColor};
`;

export const GreyButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 10px;
  align-items: center;
  height: 35px;
  justify-content: center;

  margin-top: 20px;
  border: 3px solid ${colors.placeholder};
`;

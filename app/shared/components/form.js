import styled from 'styled-components';
import colors from '../config/colors';

export const Input = styled.TextInput`
  font-size: 16px;
  width: 100%;
  border-color: ${colors.placeholder};
  border-width: 1px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background: ${colors.white};
`;

export const FormContainer = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

export const CheckboxInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const CheckboxLabel = styled.Text`
  line-height: 25px;
  color: ${colors.black};
  font-size: 17px;
`;

export const PasswordFieldContainer = styled.View`
  width: 100%;
`;

import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1rem;
  margin: 0;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-transform: capitalize;
`;

export const TextArea = styled.textarea`
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1.25rem;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  resize: none;
  box-sizing: border-box;
`;

export const LabelContainer = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  margin-right: 0.5rem;
  margin-top: 0;
  display: inline-block;
  height: 2.38rem;
  width: ${props => (props.small ? '8rem' : '12.5rem')};
  line-height: 2.38rem;
  position: relative;
  border: 1px solid #d8d8d8;
  overflow: hidden;
  border-radius: 4px;
  &:before {
    content: attr(title);
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 50%;
    height: 100%;
    text-align: center;
    color: #55595b;
    background-color: #ebebeb;
    border-right: 1px solid #d8d8d8;
  }
`;

export const Input = styled.input`
  width: ${props => (props.full ? '100%' : '50%')};
  height: 2.38rem;
  line-height: 2.38rem;
  float: ${props => (props.full ? 'none' : 'right')};
  border: ${props => (props.full ? '1px solid #d8d8d8' : 'none')};
  border-radius: ${props => (props.full ? '4px' : 'none')};
  font-size: 1rem;
  text-align: center;
  outline: none;
  box-sizing: border-box;
  padding-left: 1rem;
  text-align: left;
`;

export const Select = styled.select`
  width: 50%;
  height: 2.38rem;
  line-height: 2.38rem;
  float: right;
  border: none;
  font-size: 1rem;
  outline: none;
  text-align: center;
  text-align-last: center;
`;

export const Button = styled.button`
  height: 2.38rem;
  color: white;
  background: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  border: none;
  padding: 0 1rem;
  outline: none;
`;

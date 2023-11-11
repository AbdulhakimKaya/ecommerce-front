import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";


export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  gap: 8px;
  
  ${props => props.block && css`
    display: block;
    width: 100%;
  `};
  
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
    border: 2px solid #fff;
  `};
  
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;

    //&:hover {
    //  background-color: #fff;
    //  color: #000;
    //}
  `};
  
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
  `};
  
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 2px solid #000;

    //&:hover {
    //  background-color: #000;
    //  color: #fff;
    //}
  `};
  
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    color: #fff;
    border: 2px solid ${primary};
  `};
  
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    color: ${primary};
    border: 2px solid ${primary};
    
    &:hover {
      background-color: ${primary};
      color: #fff;
      border: 2px solid ${primary};
    }
  `};
  
  ${props => props.borderless && css`
    border: none;
    background-color: transparent;
  `}
  
  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
  `}
`

const StyledButton = styled.button`
  ${ButtonStyle}
`

export default function Button({children, ...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    )
}
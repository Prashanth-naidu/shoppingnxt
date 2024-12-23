import styled from 'styled-components'

export const CartImage = styled.img`
  width: 180px;
`

export const CartContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 20px;
  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`

export const Container = styled.div``

export const NoProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-style: Italic;
`
export const NoProduct = styled.h1`
  text-align: center;
`

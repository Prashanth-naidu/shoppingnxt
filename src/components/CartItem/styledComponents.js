import styled from 'styled-components'

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
  max-height: 80%;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`
export const ProductDetails = styled.div``
export const FirstPart = styled.div`
  display: flex;
  width: 30%;
`

export const ImageEle = styled.img`
  max-width: 15px;
  max-height: 150px;
  min-width: 150px;
  min-height: 150px;
  border-radius: 8px;
  margin-right: 5px;
  @media screen and (max-width: 768px) {
    max-width: 100px;
    max-height: 100px;
    min-width: 100px;
    min-height: 100px;
  }
`

export const Title = styled.h1``

export const Brand = styled.p``

export const SecondPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 30%;
`

export const QuantityDetails = styled.div`
  display: flex;
  align-items: center;
`

export const IconBtn = styled.button`
  background-color: transparent;
  border: 0px;
`

export const Quantity = styled.p``

export const Price = styled.p``

export const DeleteIcon = styled.button`
  background-color: transparent;
  border: 0px;
`

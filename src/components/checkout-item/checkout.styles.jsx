import styled, {css} from 'styled-components';

const ItemPropsContainerWidth = css`
    width: 23%;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
    ${ItemPropsContainerWidth}
    padding-right: 15px;

    img {
      width: 100%;
      height: 100%;
    }
`;

export const TextContainer = styled.div`
    ${ItemPropsContainerWidth}
`;

export const QuantityContainer = styled.div`
    ${ItemPropsContainerWidth}
    display: flex;

    .arrow {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
`;

export const RemoveButtonContainer = styled.div`
    padding-left: 12px;
    cursor: pointer;
`;
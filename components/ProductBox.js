import styled from "styled-components";
import Button from "@/components/Button";
import {FaShoppingCart} from "react-icons/fa";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";


const ProductWrapper = styled.div`

`

const WhiteBox = styled(Link)`
  background-color: #ffffff;
  padding: 10px;
  height: 300px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  img {
    max-width: 100%;
    max-height: 300px;
  }
`

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1.4rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`

const ProductInfoBox = styled.div`
  margin-top: 5px;
  padding: 20px;
`

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: right;
  padding-bottom: 5px;
  @media screen and (min-width: 768px) {
  font-size: 1.8rem;
  text-align: left;
  }
`

export default function ProductBox({_id, title, description, price, images}) {
    const {addProduct} = useContext(CartContext)
    const url = '/product/' + _id

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    {/*<img src={images?.[0]} alt=""/>*/}
                    <img
                        src="https://cdn.vodafone.co.uk/en/assets/images/desktop/Apple_iPhone_14_Pro_Max_deep_purple-full-product-front-600.png"
                        alt=""
                    />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <div>
                        <Button
                            onClick={() => addProduct(_id)}
                            block
                            primary
                            outline
                        >
                            <FaShoppingCart size={16}/>
                            Add to Cart
                        </Button>
                    </div>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}
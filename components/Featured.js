import Center from "@/components/Center";
import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Button";
import {FaShoppingCart} from "react-icons/fa";
import ButtonLink from "@/components/ButtonLink";
import {CartContext, useCartContext} from "@/components/CartContext";
import {useContext} from "react";


const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2rem;
  @media screen and (min-width: 768px) {
  font-size: 3rem;
  }
`

const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  line-height: 25px;
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  
  div:nth-child(1) {
    order: 1;
  }

  img {
    max-width: 100%;
    margin: 0 auto;
  }

  div {
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`

const Column = styled.div`
  display: flex;
  align-items: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`

export default function Featured({product}) {
    const {addProduct} = useContext(CartContext)
    function addFeaturedToCart() {
        addProduct(product._id)
    }

    return (<Bg>
        <Center>
            <ColumnsWrapper>
                <Column>
                    <div>
                        <Title>
                            {product.title}
                        </Title>
                        <Description>
                            {product.description}
                        </Description>
                        <ButtonsWrapper>
                            <ButtonLink
                                href={'/product/' + product._id}
                                outline={1}
                                white={1}
                            >
                                Read More
                            </ButtonLink>
                            <Button
                                white
                                onClick={addFeaturedToCart}
                            >
                                <FaShoppingCart size={20}/>
                                Add to Cart
                            </Button>
                        </ButtonsWrapper>
                    </div>
                </Column>

                <Column>
                    <img
                        src="https://pngimg.com/uploads/macbook/macbook_PNG8.png"
                        alt="macbook-pro"/>

                    {/* Next JS static Image */}
                    {/*<Image src={"/iphone-14-pro.jpg"} alt="me" width="400" height="400"/>*/}
                </Column>
            </ColumnsWrapper>
        </Center>
    </Bg>)
}
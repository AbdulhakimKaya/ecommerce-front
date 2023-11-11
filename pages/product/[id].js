import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import {Product} from "@/models/Product";
import WhiteBox from "@/components/WhiteBox";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import {FaShoppingCart} from "react-icons/fa";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
  grid-template-columns: .8fr 1.2fr;
  }
`

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const Price = styled.span`
  font-size: 2rem;
  font-weight: 600;
`

export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext)

    return (
        <>
            <Header/>
            <Center>
                <ColumnsWrapper>
                    <WhiteBox>
                        <div>
                            <ProductImages images={product.images}/>
                        </div>
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <Price>${product.price}</Price>
                            <Button
                                primary
                                onClick={() => addProduct(product._id)}
                            >
                                <FaShoppingCart size={20}/>
                                Add to Cart
                            </Button>
                        </PriceRow>
                    </div>

                </ColumnsWrapper>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect()
    const {id} = context.query
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}

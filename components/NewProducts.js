import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";


const Title = styled.h2`
  font-size: 2.4rem;
  margin: 30px 0 30px 0;
  font-weight: 500;
`

export default function NewProducts({products}) {
    return (
        <Center>
            <Title>
                New Arrivals
            </Title>
            <ProductsGrid products={products}/>
        </Center>
    )
}
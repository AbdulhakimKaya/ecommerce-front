import styled from "styled-components";
import ProductBox from "@/components/ProductBox";


const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media screen and (min-width: 768px) {
  grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;
  }
`

export default function ProductsGrid({products}) {
    return (
        <StyledProductsGrid>
            {products?.length > 0 && products.map((product) => (
                <div key={product._id}>
                    <ProductBox {...product} />
                </div>
            ))}
        </StyledProductsGrid>
    )
}
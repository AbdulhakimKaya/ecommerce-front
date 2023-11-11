import styled from "styled-components";
import {useState} from "react";


const BigImageWrapper = styled.div`
  text-align: center;
`

const BigImage = styled.img`
  max-width: 100%;
  max-height: 500px;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const ImageButtons = styled.div`
  display: flex;
  flex-grow: 0;
  gap: 10px;
  margin-top: 10px;
`

const ImageButton = styled.div`
  border: 2px solid #ccc;
  
  ${props => props.active 
          ? `
            border-color: #ccc;
          ` 
          : `
            border-color: transparent
          `}
  
  border-radius: 5px;
  height: 80px;
  padding: 2px;
  cursor: pointer;
`

export default function ProductImages({images}) {
    const [activeImage, setActiveImage] = useState(images?.[0])

    return (
        <>
            <BigImageWrapper>
                {/*<BigImage src={activeImage} alt=""/>*/}
                <BigImage
                    src="https://cdn.vodafone.co.uk/en/assets/images/desktop/Apple_iPhone_14_Pro_Max_deep_purple-full-product-front-600.png"
                    alt=""
                />
            </BigImageWrapper>
            <ImageButtons>
                {/*{images.map((image, index) => (*/}
                {/*    <ImageButton*/}
                {/*        key={index}*/}
                {/*        active={image === activeImage}*/}
                {/*        onClick={() => setActiveImage(image)}*/}
                {/*    >*/}
                {/*        <Image src={image} alt=""/>*/}
                {/*    </ImageButton>*/}
                {/*))}*/}

                <ImageButton>
                    <Image src="https://cdn.vodafone.co.uk/en/assets/images/desktop/Apple_iPhone_14_Pro_Max_deep_purple-full-product-front-600.png"/>
                </ImageButton>

                <ImageButton>
                    <Image src="https://cdn.vodafone.co.uk/en/assets/images/desktop/Apple_iPhone_14_Pro_Max_deep_purple-full-product-front-600.png"/>
                </ImageButton>

            </ImageButtons>
        </>
    )
}
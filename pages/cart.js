import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";
import Input from "@/components/Input";
import WhiteBox from "@/components/WhiteBox";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
  grid-template-columns: 1.2fr 0.8fr;
  }
`

const ProductInfoCell = styled.td`
  padding: 10px 0;
`

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  img {
    max-width: 100px;
    max-height: 100px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 120px;
    height: 120px;
    img {
      max-width: 120px;
      max-height: 120px;
    }
  }
`

const QuantityLabel = styled.span`
  padding: 0 18px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 5px;
  }
`

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`

export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')

    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (cartProducts?.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then((response) => {
                    setProducts(response.data)
                })
        } else {
            setProducts([])
        }
    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        if (window.location.href.includes('success')) {
            setIsSuccess(true)
            clearCart()
        }
    }, [])

    function moreOfThisProduct(id) {
        addProduct(id)
    }

    function lessOfThisProduct(id) {
        removeProduct(id)
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, country, city, postalCode, streetAddress,
            cartProducts,
        })
        if (response.data.url) {
            window.location = response.data.url
        }
    }

    let total = 0
    for (const productId of cartProducts) {
        const price = products.find(product => product._id === productId)?.price || 0
        total += price
    }

    if (isSuccess) {
        return (
            <>
                <Header/>
                <Center>
                    <ColumnsWrapper>
                        <WhiteBox>
                            <h1>Thanks for your orders</h1>
                            <p>We will email you when your order will be sent.</p>
                        </WhiteBox>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }

    return (
        <>
            <Header/>
            <Center>
                <ColumnsWrapper>
                    <WhiteBox>
                        <h2>Cart</h2>
                        {
                            !cartProducts?.length && (
                                <div>Your Cart is Empty</div>
                            )
                        }
                        {
                            products?.length > 0 && (
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    {/*<img src={product.images[0]} alt={`${product.title}`}/>*/}
                                                    <img
                                                        src="https://cdn.vodafone.co.uk/en/assets/images/desktop/Apple_iPhone_14_Pro_Max_deep_purple-full-product-front-600.png"
                                                        alt={`${product.title}`}
                                                    />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button
                                                    borderless
                                                    onClick={() => lessOfThisProduct(product._id)}
                                                >
                                                    <AiOutlineMinusCircle color={'#5542F6'}/>
                                                </Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button
                                                    borderless
                                                    onClick={() => moreOfThisProduct(product._id)}
                                                >
                                                    <AiOutlinePlusCircle color={'#5542F6'}/>
                                                </Button>
                                            </td>
                                            <td>
                                                ${cartProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            )
                        }
                    </WhiteBox>

                    {
                        !!cartProducts?.length && (
                            <WhiteBox>
                                <h2>Order Information</h2>
                                <Input
                                    type="text"
                                    placeholder={"Name"}
                                    value={name}
                                    name={"name"}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder={"Email"}
                                    value={email}
                                    name={"email"}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder={"Country"}
                                    value={country}
                                    name={"country"}
                                    onChange={(event) => setCountry(event.target.value)}
                                />
                                <CityHolder>
                                    <Input
                                        type="text"
                                        placeholder={"City"}
                                        value={city}
                                        name={"city"}
                                        onChange={(event) => setCity(event.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder={"Postal Code"}
                                        value={postalCode}
                                        name={"postalCode"}
                                        onChange={(event) => setPostalCode(event.target.value)}
                                    />
                                </CityHolder>
                                <Input
                                    type="text"
                                    placeholder={"Street Address"}
                                    value={streetAddress}
                                    name={"streetAddress"}
                                    onChange={(event) => setStreetAddress(event.target.value)}
                                />

                                <Input
                                    type={"hidden"}
                                    name={"products"}
                                    value={cartProducts.join(',')}
                                />

                                <Button
                                    block
                                    black
                                    onClick={goToPayment}
                                >
                                    Continue to Payment
                                </Button>
                            </WhiteBox>
                        )
                    }
                </ColumnsWrapper>
            </Center>
        </>
    )
}
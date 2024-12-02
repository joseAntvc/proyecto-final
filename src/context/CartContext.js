import { useState, createContext, useEffect } from "react"
import { toast } from 'react-toastify';


export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState(carritoInicial);

    const hadleAgregar = (product, quantity) => {
        if (quantity !== 0) {
            const item = { product, quantity }
            const newCart = [...carrito];
            const isCart = carrito.find((prod) => prod.product._id === product._id);
            if (isCart) {
                isCart.quantity += quantity;
                toast.success("Sumado al producto");
            } else {
                newCart.push(item)
                toast.success("Agregado el producto");
            }
            setCarrito(newCart)
        } else if (carrito.find(item => item.product._id === product._id).quantity === product.stock) {
            toast.error("Tienes todos los productos disponibles en tu carrito");
        } else {
            toast.error("Sin disponibilidad");
        }
        
    }

    const hadleBorrar = (id) => {
        const newCarrito = carrito.filter(item => item.product._id !== id);
        setCarrito(newCarrito);
        toast.success("Producto eliminado del carrito");
    }

    const quantityCart = () => {
        return carrito.reduce((acc, prod) => acc + prod.quantity, 0)
    }

    const priceTotal = () => {
        return carrito.reduce((acc, prod) => acc + prod.product.price * prod.quantity, 0)
    }

    const vaciarCart = () => {
        setCarrito([]);
    }

    const handleSum = (product) => {
        const produCart = carrito.find(item => item.product._id === product._id);
        if (produCart.quantity < product.stock) {
            produCart.quantity += 1;
            setCarrito([...carrito]);
        }
    };

    const handleRest = (product) => {
        const produCart = carrito.find(item => item.product._id === product._id);
        if (produCart.quantity > 1) {
            produCart.quantity -= 1;
            setCarrito([...carrito]);
        }
    };

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

    return (
        <CartContext.Provider value={{ 
            carrito, 
            hadleAgregar, 
            quantityCart, 
            priceTotal, 
            vaciarCart,
            hadleBorrar,
            handleSum, 
            handleRest
            }}>

            {children}
        </CartContext.Provider>
    )
}
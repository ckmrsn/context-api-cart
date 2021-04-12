import React, { createContext, useState } from 'react'
import './style.css'
import { Route } from 'react-router-dom'
import Products from './components/Products'
import Cart from './components/Cart'
import { data } from './data'

export const BooksContext = createContext()

export default function App() {
	const [state, setstate] = useState({
		booklist: data,
		cart: [],
	})

	const addToCart = (book) => {
		setstate({
			...state,
			cart: state.cart.find((cartitem) => cartitem.id === book.id)
				? state.cart.map((cartitem) =>
						cartitem.id === book.id
							? { ...cartitem, count: cartitem.count + 1 }
							: cartitem
				  )
				: [...state.cart, { ...book, count: 1 }],
		})
	}
	const removeFromCart = (id) => {
		setstate({
			...state,
			cart: state.cart.filter((cartitem) => cartitem.id !== id),
		})
	}

	const increase = (id) => {
		setstate({
			...state,
			cart: state.cart.map((cartitem) =>
				cartitem.id === id
					? { ...cartitem, count: cartitem.count + 1 }
					: { ...cartitem }
			),
		})
	}
	const decrease = (id) => {
		setstate({
			...state,
			cart: state.cart.map((cartitem) =>
				cartitem.id === id
					? {
							...cartitem,
							count:
								cartitem.count > 1
									? cartitem.count - 1
									: cartitem.count,
					  }
					: { ...cartitem }
			),
		})
	}
	return (
		<BooksContext.Provider
			value={{ state, addToCart, increase, decrease, removeFromCart }}
		>
			<div className='App'>
				<h1>Alışveriş Sepeti Uygulaması</h1>
				<Route exact path='/' component={Products} />
				<Route path='/cart' component={Cart} />
			</div>
		</BooksContext.Provider>
	)
}

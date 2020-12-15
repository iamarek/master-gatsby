import React from 'react'
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
    console.log({ data })
    const pizzas = data.pizzas.nodes;
    console.log({pizzas})
    return (
        <>
            <SEO
                title={pageContext.topping ? `Pizzas with ${pageContext.topping}` : 'All Pizzas'} />
            <ToppingsFilter activeTopping={pageContext.topping}/>
            <PizzaList pizzas={pizzas} />
        </>
    )
}

export const query = graphql`
    query PizzaQuery($regex: String) {
        pizzas: allSanityPizza(filter: {
                toppings: {elemMatch: {name: {regex: $regex}}}
            }) {
            nodes {
                name
                id
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
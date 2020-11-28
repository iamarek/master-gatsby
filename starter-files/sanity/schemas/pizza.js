import { MdLocalPizza as icon } from 'react-icons/md'
import PriceInput from '../components/PriceInput';

export default {
    // Computer name
    name: 'pizza',
    // Visible title
    title: 'Pizzas',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'Name of the pizza',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            inputComponent: PriceInput,
            description: 'Price of the pizza in cents',
            validation: Rule => Rule.min(1000).max(50000),
            // TODO: Add custom input component
        },
        {
            name: 'toppings',
            title: 'Toppings',
            type: 'array',
            of: [ { type: 'reference', to: [{ type: 'topping' }] } ]
        },
    ],
    preview: {
        select: {
            name: 'name',
            media: 'image',
            isVeggie0: 'toppings.0.vegetarian',
            isVeggie1: 'toppings.1.vegetarian',
            isVeggie2: 'toppings.2.vegetarian',
            isVeggie3: 'toppings.3.vegetarian',
            topping0: 'toppings.0.name',
            topping1: 'toppings.1.name',
            topping2: 'toppings.2.name',
            topping3: 'toppings.3.name',
        },
        prepare: (fields) => {
            const tops = [
                fields.topping0,
                fields.topping1,
                fields.topping2,
                fields.topping3
            ].filter(Boolean);
            const veggies = [
                fields.isVeggie0,
                fields.isVeggie1,
                fields.isVeggie2,
                fields.isVeggie3
            ].filter(item => item !== undefined);
            let isPizzaVegetarian = veggies.every((item) => item === true);
            return {
                title: `${fields.name} ${isPizzaVegetarian ? '🌱' : ''}`,
                media: fields.media,
                subtitle: tops.join(', ')
            }
        }
    }
};
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Category, setCategories} from '../store/categoriesSlice';
import axios from 'axios';
import { ListContainer, CategoryItem } from './CategoryListStyles';
import { Link } from 'react-router-dom';
import {RootState} from "../store/store";

function CategoryList() {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    useEffect(() => {
        axios
            .get('https://express-shina.ru/vacancy/catalog')
            .then((response) => {
                if (response.data.categories && response.data.categories.length > 0) {
                    const sortedCategories = response.data.categories.sort((a: Category, b: Category) =>
                        a.name.localeCompare(b.name)
                    );
                    dispatch(setCategories(sortedCategories));
                } else {
                    console.error('Response data does not contain valid categories:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [dispatch]);

    return (
        <ListContainer>
            <h1>Список категорий</h1>
            <ul>
                {categories.map((category: Category) => (
                    <CategoryItem key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                    </CategoryItem>
                ))}
            </ul>
        </ListContainer>
    );
}

export default CategoryList;

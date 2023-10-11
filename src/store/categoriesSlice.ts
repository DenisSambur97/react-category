import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
    id: number;
    name: string;
    slug: string;
    index: boolean;
    children: Category[] | null;
}

interface CategoriesState {
    categories: Category[];
    currentCategory: Category | null;
}

export type RootState = {
    categories: {
        categories: Category[];
        currentCategory: Category | null;
    };
};

const initialState: CategoriesState = {
    categories: [],
    currentCategory: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
            state.currentCategory = action.payload;
        },
    },
});

export const { setCategories, setCurrentCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

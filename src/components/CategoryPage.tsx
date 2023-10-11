import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function CategoryPage() {
    const { id } = useParams();
    const [category, setCategory] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [expandedChild, setExpandedChild] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://express-shina.ru/vacancy/catalog?id=${id}`);
                const data = response.data.categories[0];
                setCategory(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const metaRobots = category.index ? 'index' : 'noindex';

    return (
        <div>
            <Helmet>
                <meta name="robots" content={metaRobots} />
            </Helmet>
            <h1>{category.name}</h1>
            <ul>
                {category.children && category.children.map((child: any) => (
                    <li key={child.id}>
                        <a onClick={() => setExpandedChild(expandedChild === child.id ? null : child.id)}>
                            {child.name}
                        </a>
                        {expandedChild === child.id && child.children && (
                            <ul>
                                {child.children.map((subChild: any) => (
                                    <li key={subChild.id}>
                                        <Link to={`/category/${subChild.id}`}>{subChild.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <Link to={`/`} className="link-no-underline">Назад</Link>
            <Outlet />
        </div>
    );
}

export default CategoryPage;

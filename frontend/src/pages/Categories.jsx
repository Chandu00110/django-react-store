import React,{useState,useEffect} from 'react';
import api from '../api/axios';
import fetchAPI from '../api/fetchAPI';
import Form from 'react-bootstrap/Form';

const Categories = ({products,setProducts}) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState();
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await fetchAPI(`category/`);
            
            if (res.status === 200) {
            setCategories(res.data.results);
            } else {
            console.error("Error fetching categories:", res.status, res.statusText);
            }
        } catch (err) {
            console.error("Network or server error while fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchResults = async (e) => {

        if (selectedCategory !== 'all') {
            const res = await api.get(`product/`,{
                params : {
                    search : selectedCategory
                }
            });
            setProducts(res.data.results);
        }else{
            const res = await api.get(`product/`);
            setProducts(res.data.results);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    },[selectedCategory])

    
    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <p>Loading Categories.........</p>;
    }
  return (
    <div>
        {categories.length !== 0 && (
        <>
            <h2>Categories</h2>
            <div>
                <>
                    <Form>
                        <Form.Check 
                            type='radio'
                            name='category'
                            value='all'
                            label='All'
                            onChange={(e) => setSelectedCategory("all")}
                        />
                        {categories.map((cat) => (
                            <Form.Check // prettier-ignore
                                    type='radio'
                                    name="category"
                                    id={cat.id}
                                    value={cat.name}
                                    label={cat.name}
                                    onChange={(e) => setSelectedCategory(cat.name)}
                                />
                            ))}
                    </Form>
                </>
            </div>
        </>
        )}
    </div>
    );
}

export default Categories
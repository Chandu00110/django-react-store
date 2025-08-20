import React,{useState,useEffect} from 'react';
import fetchAPI from '../api/fetchAPI';
import Form from 'react-bootstrap/Form';

const Categories = () => {

    const [categories, setCategories] = useState([]);
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
            {categories.map((cat) => (
                <>
                    <Form>
                        <Form.Check // prettier-ignore
                                type='checkbox'
                                id={cat.id}
                                label={cat.name}
                            />
                    </Form>
                </>
            ))}
            </div>
        </>
        )}
    </div>
    );
}

export default Categories
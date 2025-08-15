import React,{useState,useEffect} from 'react';
import api from '../api/axios';
import Form from 'react-bootstrap/Form';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        api.get("category/")
        .then((res) => {
            setCategories(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Errror fetching the products: ", err);
            setLoading(false);
        });
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
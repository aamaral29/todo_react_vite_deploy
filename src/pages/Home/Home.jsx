/* eslint-disable no-unused-vars */
// CSS
import styles from './Home.module.css'

// hooks
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Components
import PostDetail from '../../components/PostDetail';

const Home = () => {

    const [ query, setQuery ] = useState('');
    const { documents:posts, loading } = useFetchDocuments('posts') // Busca documents e renomeia para posts
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?=${query}`);
        }
    }

    return (
        <div className={styles.home}>
            <h1>Posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input 
                    type="text" 
                    placeholder='Ou busque por tags...' 
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='btn btn-dark'>Pesquisar</button>
            </form>
            <div className='post-list'>
                {loading && <p>Carregando...</p>}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
                    </div>
                )}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
            </div>
        </div>
    );

};

export default Home;
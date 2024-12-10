import React from 'react';
import './App.css';
import Layout from './layouts/layout';
import Routes from './routes/index';

const App: React.FC = () => {
    return (
        <>
            <Layout>
                <Routes />
            </Layout>
        </>
    );
};

export default App;

import React, { ReactNode } from 'react';

import Header from '../layouts/header';

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container mt-5">
                {children}
            </div>
        </>
    );
};

export default Layout;

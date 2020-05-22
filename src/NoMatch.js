import React from 'react';
import { Layout } from './components/Layout';
import './App.css';

export const NoMatch = () => (
    <div>
        <Layout>
            <div className="App-body">
                <h1>Error 404</h1>
            </div>
        </Layout>
    </div>
)
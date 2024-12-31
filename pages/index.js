import React, { useState } from 'react';
import Main from './components/Main';
import Cat from './components/Cat';
import UI from './components/UI';

function App() {
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-blue-500 to-green-500" style={{ outline: '2px solid black', outlineOffset: '-10px' }}>
            <div className="w-auto h-auto relative">
                <Cat />
            </div>
            <UI />
        </div>
    );
}

export default App;
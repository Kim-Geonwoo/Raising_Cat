import React from 'react';
import Main from './components/Main';
import Cat from './components/Cat';
import UI from './components/UI';

function CatPage() {
    return (
        <div>
            <div class="w-auto h-auto">
                <Cat />
            </div>
            <UI />
        </div>
    );
}

export default CatPage;
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

const HostPage = () => {
    return (<div>
        <h1>Host Page</h1>
        <div>

        </div>
    </div>)
}

const init = () => {
    const root = createRoot(document.getElementById('host-content'));

    root.render(
        <HostPage/>
    )
}

window.onload = init;
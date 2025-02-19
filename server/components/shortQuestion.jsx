import { useState, useRef } from 'react'

const shortQuestion = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
    });

    return (
        <form id="questionPostForm">

            <textarea id="contentArea" name="content" required="true" placeholder="Write answer here" rows="1"></textarea>
        </form>
    );
}
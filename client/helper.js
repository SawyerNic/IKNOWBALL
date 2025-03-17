const sendGet = async (url, handler) => {
    try {
        // Execute a fetch request with method GET, including headers for JSON content type.
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Parse the JSON response.
        const result = await response.json();

        // If the response includes a redirect, navigate to that URL.
        if (result.redirect) {
            window.location = result.redirect;
        }

        // If the response contains an error, log a placeholder message and display the error message.
        if(result.error){
            console.log('doing stuff');
            handleError(result.error);
        }

        // If a handler function is provided, execute it with the result as an argument.
        if(handler) {
            handler(result);
        }

        // Return the result for further processing.
        return result;
    } catch (error) {
        // Log any errors that occur during the fetch request.
        console.error('Error:', error);
    }
};

const sendPost = async (url, data, handler) => {
    try {
        // Execute a fetch request with method POST, including headers for JSON content type and the stringified data as the body.
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Parse the JSON response.
        const result = await response.json();

        // If the response includes a redirect, navigate to that URL.
        if (result.redirect) {
            window.location = result.redirect;
        }

        // If the response contains an error, log a placeholder message and display the error message.
        if(result.error){
            console.log('doing stuff');
            handleError(result.error);
        }

        // If a handler function is provided, execute it with the result as an argument.
        if(handler) {
            handler(result);
        }

        // Return the result for further processing.
        return result;
    } catch (error) {
        // Log any errors that occur during the fetch request.
        console.error('Error:', error);
    }
};

module.exports = {
    sendGet,
    sendPost
};
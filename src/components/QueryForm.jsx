import React, { useState } from 'react';

const QueryForm = (props) => {
    // State to store query name and info
    const [queryName, setQueryName] = useState('');
    const [queryInfo, setQueryInfo] = useState('');

    // Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
      
    };

    return (
        <div className="query-form">
            <h3>Query Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="query-name">Query Name:</label>
                    <input
                        type="text"
                        id="query-name"
                        name="query-name"
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="query-info">Query Info:</label>
                    <textarea
                        id="query-info"
                        name="query-info"
                        value={queryInfo}
                        onChange={(e) => setQueryInfo(e.target.value)}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit">Go</button>
            </form>
        </div>
    );
};

export default QueryForm;
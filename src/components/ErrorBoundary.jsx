import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service or console
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold text-red-600">Something went wrong. Please try again later.</h1>
                </div>
            );
        }

        // Render children components if no error
        return this.props.children;
    }
}

export default ErrorBoundary;

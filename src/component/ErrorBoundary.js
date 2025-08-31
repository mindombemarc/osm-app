import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Met à jour l'état pour afficher le fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Tu peux logger l'erreur à un service externe ici
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", backgroundColor: "#fdd", color: "#900" }}>
          <h2>Une erreur est survenue dans l'application.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={() => window.location.reload()}>Recharger la page</button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

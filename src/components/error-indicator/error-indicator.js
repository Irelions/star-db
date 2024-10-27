import './error-indicator.css';
import { Component } from 'react';

export default class ErrorIndicator extends Component {
  render() {
    return (
      <div className="error-indicator">
        <span className="boom">Boom!</span>
        <span>something has gone terribly wrong</span>
        <span>(but we already sent droids to fix it)</span>
      </div>
    );
  }
}

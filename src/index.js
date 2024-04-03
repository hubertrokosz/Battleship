import './style.css';
import { createDOM, attack } from './DOMinteraction';

document.addEventListener('DOMContentLoaded', function() {
    createDOM();
    attack();
});


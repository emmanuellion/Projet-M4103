import './css/common.scss';
import './css/styles.scss';
import Searcher from './exports/Searcher.js';

new Searcher();

document.querySelector('#end').onclick = function (){
    location.reload();
}

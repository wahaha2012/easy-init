'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './components/helloWorld';
import {Wrapper} from './components/wrapper';
import propsHelloWorld from './data/helloWorld';

let wrapper = document.createElement('div');
document.body.appendChild(wrapper);

ReactDOM.render(
  <Wrapper>
    <HelloWorld {...propsHelloWorld} />
  </Wrapper>, 
wrapper);
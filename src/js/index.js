import React from 'react';
import { render } from 'react-dom';

import Root from './containers/root';
import configureStore from './store/';
import { fetchData } from './actions/';

const store = configureStore();
store.dispatch(fetchData());

render(
	<Root store={store} />,
	document.getElementById('root')
);
import { useSelector } from '@cogoport/store';
import React from 'react';

import FutureExpectationCards from './FutureExpectationCards';
import Header from './Header';
import PlatformCards from './PlatformCards';
import QuickStartCards from './QuickStartCards';
import WelcomeText from './WelcomeText';

function ThingsToDo() {
	const {
		profile:{ user = {} },
	} = useSelector((state) => state);

	const { name = '' } = user;

	return (
		<div>
			<Header name={name} />
			<WelcomeText />
			<QuickStartCards />
			<PlatformCards />
			<FutureExpectationCards />
		</div>
	);
}

export default ThingsToDo;

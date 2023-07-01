import { useSelector } from '@cogoport/store';
import React from 'react';

import FutureExpectationCards from './FutureExpectationCards';
import Header from './Header';
import PlatformCards from './PlatformCards';
import QuickStartCards from './QuickStartCards';
import TermsAndConditions from './TermsAndConditions';
import WelcomeText from './WelcomeText';

function ThingsToDo() {
	const {
		profile:{ user = {} },
	} = useSelector((state) => state);

	const { name = '', picture = '' } = user;

	return (
		<div>
			<Header name={name} picture={picture} />
			<WelcomeText name={name} />
			<QuickStartCards />
			<PlatformCards />
			<FutureExpectationCards />
			<TermsAndConditions />
		</div>
	);
}

export default ThingsToDo;

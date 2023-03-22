import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const BUTTON_TEXT_MAPPING = {
	tests         : ' Test',
	question_set  : 'Question Set',
	all_questions : 'Not Sure',

};

const ROUTE_MAPPING = {
	tests        : 'create-test',
	question_set : 'create-question',
};

function Header(props) {
	const { activeTab } = props;
	const router = useRouter();

	return (
		<div className={styles.flex_div}>

			<div className={styles.title}>
				<IcMArrowBack className={styles.styled_icon} onClick={() => router.back()} />
				Test Module
			</div>

			<Button onClick={() => router.push(`/learning/test-module/${ROUTE_MAPPING[activeTab]}`)}>
				+ Create New
				{' '}
				{BUTTON_TEXT_MAPPING[activeTab]}
			</Button>

		</div>
	);
}

export default Header;

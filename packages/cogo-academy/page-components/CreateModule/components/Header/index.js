import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const BUTTON_TEXT_MAPPING = {
	tests         : ' Test',
	question_set  : 'Question Set',
	all_questions : 'Not Sure',

};

function Header(props) {
	const { activeTab } = props;
	const router = useRouter();
	return (
		<div className={styles.flex_div}>
			<div className={styles.title}>Test Module</div>
			<Button onClick={() => router.push('/learning/faq/create/test-module/create')}>
				+ Create New
				{' '}
				{BUTTON_TEXT_MAPPING[activeTab]}
			</Button>
		</div>
	);
}

export default Header;

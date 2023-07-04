import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const LIVE_COURSES = {
	introduction_to_cogoport : GLOBAL_CONSTANTS?.drive_link?.introduction_to_cogoport_link,
	git_course               : GLOBAL_CONSTANTS?.drive_link?.git_course_link,
	html_css_course          : GLOBAL_CONSTANTS?.drive_link?.html_css_course_link,
};

const onClickOpen = (url) => {
	window.open(url, '_blank');
};

function LiveCourseModal() {
	return Object.keys(LIVE_COURSES).map((key) => (
		<div key={key} className={styles.course_list}>
			{startCase(key).toUpperCase()}
			<Button
				size="sm"
				onClick={() => onClickOpen(LIVE_COURSES[key])}
			>
				OPEN
			</Button>
		</div>
	));
}

export default LiveCourseModal;

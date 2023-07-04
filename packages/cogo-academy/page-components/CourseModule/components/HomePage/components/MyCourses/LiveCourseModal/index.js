import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const LIVE_COURSES = {
	introduction_to_cogoport : 'https://drive.google.com/file/d/1LHKPCefOzcakw7-uoy2dQCuWI0lbLz8y/view?usp=drive_link',
	git_course               : 'https://drive.google.com/file/d/1ybk4-hUbndH51oZZ7FoVVCtKqVskPPC5/view?usp=drive_link',
	html_css_course          : 'https://drive.google.com/file/d/1RWlTVkny4ZwlcdnWCiQIVimHOjqBsFWv/view?usp=drive_link',
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

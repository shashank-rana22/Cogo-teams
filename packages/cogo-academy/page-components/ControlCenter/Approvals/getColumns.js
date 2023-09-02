import { Tooltip, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const getColumns = () => ([
	{
		Header   : 'NAME',
		accessor : ({ name }) => (
			<section className={styles.name_container}>
				<Tooltip
					maxWidth={400}
					content={name || '-'}
					placement="top"
				>
					<div className={styles.name}>
						{name || '-'}
					</div>
				</Tooltip>
			</section>
		),
	},

	{
		Header   : 'COURSE/TEST',
		accessor : ({ type }) => (
			<div className={styles.name}>
				{type || '-'}
			</div>
		),
	},

	{
		Header   : 'CREATED BY',
		accessor : ({ created_by }) => (
			<section className={styles.name_container}>
				<Tooltip
					maxWidth={400}
					content={created_by || '-'}
					placement="top"
				>
					<div className={styles.name}>
						{created_by || '-'}
					</div>
				</Tooltip>
			</section>
		),
	},

	{
		Header   : 'CREATED BY MAIL ID',
		accessor : ({ created_by_mail }) => (
			<section className={styles.name_container}>
				<Tooltip
					maxWidth={400}
					content={created_by_mail || '-'}
					placement="top"
				>
					<div className={styles.name}>
						{created_by_mail || '-'}
					</div>
				</Tooltip>
			</section>
		),
	},

	{
		Header   : 'created_at',
		accessor : ({ created_at }) => (
			<section className={styles.name_container}>
				<Tooltip
					maxWidth={400}
					content={created_at || '-'}
					placement="top"
				>
					<div className={styles.time}>
						<span>{created_at || '-'}</span>
					</div>
				</Tooltip>
			</section>
		),

	},

	// {
	// 	Header   : 'TOPICS',
	// 	accessor : ({ course_data }) => (
	// 		<section className={styles.courses}>

	// 			{!isEmpty(course_data) ? (
	// 				<Tooltip
	// 					maxWidth={400}
	// 					content={startCase(course_data[GLOBAL_CONSTANTS.zeroth_index])}
	// 					placement="top"
	// 					key={course_data[GLOBAL_CONSTANTS.zeroth_index]}
	// 				>
	// 					<Pill
	// 						className={styles.styled_pill}
	// 						size="lg"
	// 						color="#F3FAFA"
	// 					>
	// 						{startCase(course_data[GLOBAL_CONSTANTS.zeroth_index])}
	// 					</Pill>
	// 				</Tooltip>
	// 			) : '-'}

	// 			{course_data.length > MORE_THAN_ONE && (
	// 				<Tooltip
	// 					maxWidth={400}
	// 					content={(course_data.map((course, index) => ((index >= MORE_THAN_ONE) ? (
	// 						<Pill
	// 							key={course}
	// 							size="lg"
	// 							color="#F3FAFA"
	// 						>
	// 							{startCase(course)}
	// 						</Pill>
	// 					) : null)))}
	// 					placement="top"
	// 					interactive
	// 				>
	// 					<Pill
	// 						className={styles.topic_pill}
	// 						size="lg"
	// 						color="#F3FAFA"
	// 					>
	// 						+
	// 						{course_data.length - MORE_THAN_ONE}
	// 						{' '}
	// 						More
	// 					</Pill>
	// 				</Tooltip>
	// 			)}
	// 		</section>
	// 	),
	// },

	{
		Header   : 'ACTIONS',
		accessor : () => (
			<div>
				<div className={styles.options}>
					<Button
						size="md"
						style={{ width: '60px' }}
					>
						Redirect
					</Button>
					<Button
						size="md"
						themeType="secondary"
						style={{ width: '60px', marginLeft: '4px' }}
					>
						Reject
					</Button>

				</div>

			</div>
		),
	},
]
);

export default getColumns;

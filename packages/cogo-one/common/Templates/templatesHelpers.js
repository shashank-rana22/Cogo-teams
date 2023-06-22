import { Placeholder, Pill } from '@cogoport/components';

import { STATUS_MAPPING, STATUS_COLOR_MAPPING } from '../../constants';

import styles from './styles.module.css';

const PREVIEW_REPLACE_MAPPING = [
	{ find: /<p>\s+(<[/]p>)/g, replace: '<br>' },
	{ find: /<p>(<[/]p>)/g, replace: '<br>' },
	{ find: '<p', replace: '<div' },
	{ find: '<p>', replace: '<div>' },
	{ find: '</p>', replace: '&nbsp;</div>' },
	{ find: '</span>', replace: '&nbsp;</span>' },
];
const LOADER_COUNT = 6;

export function Preview({ previewData }) {
	const formattedPreview = PREVIEW_REPLACE_MAPPING.reduce(
		(accumulator, currentValue) => accumulator?.replaceAll(currentValue?.find, currentValue?.replace),
		previewData,
	);

	return <div dangerouslySetInnerHTML={{ __html: formattedPreview }} />;
}

export function Loader() {
	return [...Array(LOADER_COUNT).keys()].map((key) => (
		<div className={styles.loader_div} key={key}>
			<Placeholder height="10px" width="100px" margin="0 0 10px 0" />
			<Placeholder height="30px" width="200px" margin="0 0 10px 0" />
		</div>
	));
}

export function ListItem({ item, activeCard, handleSelect, openCreateReply }) {
	const {
		content: { name: messageTitle = '' } = {},
		description: messageContent = '',
		third_party_template_status,
		html_template,
		name: templateTitle,
		id,
	} = item || {};

	const disabled = third_party_template_status !== 'approved' || openCreateReply;

	const handleClick = () => {
		handleSelect(
			{
				val    : html_template,
				status : third_party_template_status,
				name   : templateTitle,
				id,
			},
		);
	};

	return (
		<div
			key={id}
			role="presentation"
			className={activeCard === id ? styles.active : styles.each_message}
			onClick={handleClick}
			style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
		>
			<div className={styles.wrap}>
				<div className={styles.title}>
					{messageTitle}
				</div>
				<div>
					<Pill
						size="md"
						color={STATUS_COLOR_MAPPING[third_party_template_status || 'pending']}
					>
						{STATUS_MAPPING[third_party_template_status || 'pending']}
					</Pill>
				</div>
			</div>
			<div className={styles.message}>
				{messageContent}
			</div>
		</div>
	);
}

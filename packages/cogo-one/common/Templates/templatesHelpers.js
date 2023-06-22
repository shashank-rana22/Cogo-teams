import { Placeholder, cl, Pill } from '@cogoport/components';

import { statusMapping, statusColorMapping } from '../../constants';

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
	let formattedPreview = previewData;

	PREVIEW_REPLACE_MAPPING.forEach((eachPreview) => {
		formattedPreview = formattedPreview?.replaceAll(eachPreview?.find, eachPreview?.replace);
	});

	return <div dangerouslySetInnerHTML={{ __html: formattedPreview }} />;
}

export function Loader() {
	return Array(LOADER_COUNT).fill().map((key) => (
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

	return (
		<div
			key={id}
			role="presentation"
			className={cl`${activeCard === id ? styles.active : styles.each_message
			}`}
			onClick={() => handleSelect(
				{
					val    : html_template,
					status : third_party_template_status,
					name   : templateTitle,
					id,
				},
			)}
			style={{
				cursor: third_party_template_status
                    !== 'approved'
                || openCreateReply ? 'not-allowed' : 'pointer',
			}}
		>
			<div className={styles.wrap}>
				<div className={styles.title}>
					{messageTitle}
				</div>
				<div>
					<Pill
						size="md"
						color={
                        statusColorMapping[third_party_template_status || 'pending']
                    }
					>
						{
                        statusMapping[third_party_template_status || 'pending']
                    }
					</Pill>
				</div>
			</div>
			<div className={styles.message}>
				{messageContent}
			</div>
		</div>
	);
}

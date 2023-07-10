import { Placeholder, Pill, Input } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { STATUS_MAPPING } from '../../constants';

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

export function Preview({
	previewData, variables,
	setCustomizableData = () => {},
}) {
	const formattedPreview = PREVIEW_REPLACE_MAPPING.reduce(
		(accumulator, currentValue) => accumulator?.replaceAll(currentValue?.find, currentValue?.replace),
		previewData,
	);

	const handleInputChange = (variable, value) => {
		setCustomizableData((prevData) => ({
			...prevData,
			[variable]: value,
		}));
	};

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: formattedPreview }} />
			<div className={styles.user_work_scope}>
				{(variables || []).map((item) => (
					<div className={styles.scope_name} key={item}>
						{startCase(item)}
						<Input
							className={styles.value_field}
							size="xs"
							placeholder="value"
							onChange={(val) => handleInputChange(item, val)}
						/>
					</div>
				))}
			</div>
		</>
	);
}

export function Loader() {
	return [...Array(LOADER_COUNT).keys()].map((key) => (
		<div className={styles.loader_div} key={key}>
			<Placeholder height="10px" width="100px" margin="0 0 10px 0" />
			<Placeholder height="30px" width="200px" margin="0 0 10px 0" />
		</div>
	));
}

export function ListItem({ item, activeCard, handleTemplateSelect, openCreateReply }) {
	const {
		content: { name: messageTitle = '' } = {},
		description: messageContent = '',
		third_party_template_status,
		id,
	} = item || {};

	const disabled = third_party_template_status !== 'approved' || openCreateReply;

	const { label, color } = STATUS_MAPPING[third_party_template_status || 'pending'] || {};

	return (
		<div
			key={id}
			role="presentation"
			className={activeCard === id ? styles.active : styles.each_message}
			onClick={() => handleTemplateSelect(item)}
			style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
		>
			<div className={styles.wrap}>
				<div className={styles.title}>
					{messageTitle}
				</div>
				<div>
					<Pill
						size="md"
						color={color}
					>
						{label}
					</Pill>
				</div>
			</div>
			<div className={styles.message}>
				{messageContent}
			</div>
		</div>
	);
}

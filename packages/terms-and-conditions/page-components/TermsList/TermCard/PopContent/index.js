import { Button } from '@cogoport/components';

import useUpdateTermsAndConditions from '../../../../hooks/useUpdateTermsAndConditionsStatus';

import styles from './styles.module.css';

function PopOverContent({
	onClickUpdateTerms = () => {},
	setShowEdit = () => {},
	setVisible = false,
	status = 'active',
	propsForUpdation = {},
	setEditModalId = () => {},
	item = {},
}) {
	const { onSubmit, loading } = useUpdateTermsAndConditions({
		...propsForUpdation,
	});

	return (
		<div className={styles.pop_content}>
			<Button onClick={() => {
				onClickUpdateTerms();
				setShowEdit(true);
				setVisible(false);
				setEditModalId(item?.id);
			}}
			>
				Edit

			</Button>
			<Button
				loading={loading}
				disabled={loading}
				onClick={onSubmit}
			>
				{' '}
				{status === 'active' ? 'Deactivate' : 'Activate'}
			</Button>

		</div>

	);
}
export default PopOverContent;

import { Button } from '@cogoport/components';

import useUpdateTermsAndConditions from '../../../../hooks/useUpdateTermsAndConditionsStatus';

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
		<div>
			<Button onClick={() => {
				onClickUpdateTerms();
				setShowEdit(true);
				setVisible(false);
				setEditModalId(item.id);
			}}
			>
				Edit

			</Button>
			<Button
				loading={loading}
				onClick={onSubmit}
			>
				{' '}
				{status === 'active' ? 'Deactivate' : 'Activate'}
			</Button>

		</div>

	);
}
export default PopOverContent;

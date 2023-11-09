import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import Card from '../Card';

const ERROR_TEXT = 'Error fetching data.Please try again after sometime';

function ModalBody({ mapArray = [], loading = false, data = {}, apiErrors = {} }) {
	if (loading) {
		return (
			<Placeholder
				height="117px"
				width="556px"
				margin="0px 0px 20px 0px"
				style={{ borderRadius: '20px' }}
			/>
		);
	}

	if (isEmpty(Object.keys(data))) {
		return (
			<div style={{ color: '#ee3425' }}>
				{apiErrors?.response?.status === 403 ? apiErrors?.response?.data?.base
					: ERROR_TEXT}
			</div>
		);
	}

	return (
		<>
			{mapArray.map((item) => (
				<Card key={item.type} {...item} />
			))}
		</>
	);
}

export default ModalBody;

import { Button, Popover } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import useRefetchPdfs from './useRefetchPdfs';

export default function RefetchPdfs({ itemData = {} }) {
	const { entityCode, id } = itemData || {};
	const refetch_pdf = ENTITY_FEATURE_MAPPING[entityCode].feature_supported.includes('refetch-pdfs');
	const { onRefetch, loading } = useRefetchPdfs({ id });
	const [show, setShow] = useState(false);

	const handleClick = () => {
		onRefetch();
	};

	const handleClose = () => {
		setShow((s) => !s);
	};

	return (
		refetch_pdf ? (
			<div>
				<Popover
					placement="left"
					visible={show}
					render={(
						<Button onClick={handleClick} type="button" disabled={loading}>
							{loading ? 'Refetching' : 'Refetch'}
						</Button>
					)}
					onClickOutside={handleClose}
				>
					<div>
						<IcMOverflowDot
							style={{ cursor: 'pointer' }}
							onClick={handleClose}
							width="16px"
							height="16px"
						/>
					</div>
				</Popover>
			</div>
		) : null
	);
}

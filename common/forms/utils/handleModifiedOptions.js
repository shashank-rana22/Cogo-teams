import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import { IcMFtick } from '@cogoport/icons-react';

const handleModifiedOptions = ({ options: newOptions = [] }) => newOptions?.map((option) => {
	const code = option?.cogo_entity?.entity_code;
	const { country_code = '' } = ENTITY_MAPPING[code];
	const verified = option?.kyc_status === 'verified';

	return ({
		...option,
		business_name: (
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div>
					<div>{option?.business_name}</div>
					<div style={{ fontSize: '12px', color: '#4f4f4f' }}>
						{country_code ? `Country Code : ${country_code}` : null}
					</div>
				</div>

				{verified && <IcMFtick fill="#67C676" height={24} width={24} />}
			</div>
		),
	});
});

export default handleModifiedOptions;

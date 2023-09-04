import { Button, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import getInternalPocData from '../../../helpers/getInternalPocData';

import ServiceIDGroup from './ServiceIDGroup';
import styles from './styles.module.css';

function Internal({
	data = [], setAddPoc = () => { }, loading = false,
	rolesPermission = {}, shipment_data = {}, activeStakeholder = '',
}) {
	const internalData = getInternalPocData(data);
	const canAddPoc = !!rolesPermission?.add_internal_poc;

	return (
		<div>
			{loading ? <Loader /> : (
				<>
					<div className={styles.header}>
						<div className={styles.heading}>Internal : Cogoport</div>
						{canAddPoc ? (
							<Button
								size="sm"
								onClick={() => {
									setAddPoc({ poc_type: 'internal' });
								}}
								themeType="accent"
							>
								+ ADD POC
							</Button>
						) : null}
					</div>

					<div>
						{Object.keys(internalData).map((key) => (
							<div className={styles.service_container} key={key}>
								<div className={styles.service_name}>
									{startCase(key)}
								</div>
								<div>
									<ServiceIDGroup
										data={internalData[key]}
										setAddPoc={setAddPoc}
										rolesPermission={rolesPermission}
										shipment_data={shipment_data}
										activeStakeholder={activeStakeholder}
									/>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Internal;

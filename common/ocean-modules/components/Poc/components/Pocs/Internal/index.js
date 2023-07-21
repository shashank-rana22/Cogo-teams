import { Button, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import getInternalPocData from '../../../helpers/getInternalPocData';

import ServiceIDGroup from './ServiceIDGroup';
import styles from './styles.module.css';

function Internal({ data = [], setAddPoc = () => { }, loading = false, rolesPermission = {}, shipment_data = {} }) {
	const internalData = getInternalPocData(data);
	const canAddPoc = !!rolesPermission?.add_internal_poc;
	const INDEX_0 = 0;

	function PrintOriginDestination(key) {
		return (
			internalData[key][INDEX_0].trade_type === 'export'
				? `origin ${startCase(key)}` : `destination ${startCase(key)}`
		);
	}

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
									{key === 'fcl_freight_local_service' ? PrintOriginDestination(key) : startCase(key)}
								</div>
								<div>
									<ServiceIDGroup
										data={internalData[key]}
										setAddPoc={setAddPoc}
										rolesPermission={rolesPermission}
										shipment_type={shipment_data?.shipment_type}
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

import { Button, Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Item({ isSupplierPage = false, item }) {
	const { push } = useRouter();
	const navigate = () => {
		push(
			'/governance-manager/[id]',
			`/governance-manager/${item?.id}`,
		);
	};
	const goBack = () => {
		push(
			'/governance-manager/',
			'/governance-manager/',
		);
	};
	const SERVICE_NAME_MAPPING = {
		fcl_freight             : 'FCL Freight',
		lcl_freight             : 'LCL Freight',
		ftl_freight             : 'FTL Freight',
		ltl_freight             : 'LTL Freight',
		air_freight             : 'AIR Freight',
		trailer_freight         : 'Trailer Freight',
		haulage_freight         : 'Haulage Freight',
		rail_domestic_freight   : 'Rail Domestic Freight',
		fcl_freight_local_agent : 'FCL Freight Local Agent',
		air_customs             : 'AIR Customs',
		air_freight_local       : 'AIR Freight Local',
		fcl_customs             : 'FCL Customs',
		lcl_customs             : 'LCL Customs',
		fcl_cfs                 : 'FCL CFS',
	};

	return (
		<div className={styles.item}>
			{ isSupplierPage && (
				<div>
					<Button themeType="secondary" onClick={() => goBack()}>
						Go Back
					</Button>
				</div>
			)}
			<div>
				<div className={styles.key}>Supplier Name</div>
				<div className={styles.value}>{item?.organization?.business_name}</div>
			</div>
			<div>
				<div className={styles.key}>Home Country</div>
				<div className={styles.value}>Australia</div>
			</div>
			<div>
				<div className={styles.key}>Service Provided</div>
				<div className={styles.value}>
					{SERVICE_NAME_MAPPING[item?.service]}
				</div>
			</div>

			{ !isSupplierPage && (
				<>
					<div>
						<div className={styles.key}>Analysys Status</div>
						<div className={styles.value}>
							<Pill
								size="md"
								color="blue"
							>
								2/4 Services Needed
							</Pill>

						</div>
					</div>
					<div>
						<Button themeType="accent" onClick={() => navigate()}>
							View
						</Button>
					</div>

				</>
			)}

		</div>
	);
}

export default Item;

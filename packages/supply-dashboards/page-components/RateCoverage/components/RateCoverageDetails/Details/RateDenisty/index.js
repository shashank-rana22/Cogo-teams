import { ButtonIcon, Pagination, Table } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import useListPartnerExpertises from '../../../../hooks/useListPartnerExpertises';
import AddRateModel from '../AddRateModel';
import styles from '../styles.module.css';

const data = [
	{
		originPort      : 'Shanghai(China)',
		destinationPort : 'linsley',
		commodity       : 'lskdjf',
		containerType   : 'ksdjfk',
		containerSize   : 'skldjk',
		noOfRates       : 3,
		addRate         : 'Add Rate',
	},
	{
		originPort      : 'tanner',
		destinationPort : 'linsley',
		commodity       : 'lskdjf',
		containerType   : 'ksdjfk',
		containerSize   : 'skldjk',
		noOfRates       : 3,
		addRate         : 'Add Rate',
	},
	{
		originPort      : 'tanner',
		destinationPort : 'linsley',
		commodity       : 'lskdjf',
		containerType   : 'ksdjfk',
		containerSize   : 'skldjk',
		noOfRates       : 3,
		addRate         : 'Add Rate',
	},
];

function RateDensityDetails({ setIndex, value }) {
	const [show, setShow] = useState(false);

	const { data:rug } = useListPartnerExpertises();
	console.log(rug, 'data');

	const columns = [
		{ Header: 'ORIGIN PORT', accessor: 'originPort' },
		{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
		{ Header: 'COMMODITY', accessor: 'commodity' },
		{ Header: 'CONTAINER TYPE', accessor: 'containerType' },
		{ Header: 'CONTAINER SIZE', accessor: 'containerSize' },
		{ Header: 'NO OF RATES', accessor: 'noOfRates' },
		{
			Header   : ' ',
			accessor : () => (
				<button
					className={styles.add_rate}
					onClick={
						() => setShow(true)
				}
				>
					Add Rate
				</button>
			),
		},
	];
	return (
		<>
			<AddRateModel show={show} setShow={setShow} />
			<div className={styles.parent}>
				<div className={styles.nav}>
					<div>
						<div>
							<ButtonIcon
								onClick={() => setIndex(-1)}
								size="md"
								icon={<IcMArrowBack />}
								themeType="primary"
								style={{ backgroundColor: 'inherit' }}
							/>
						</div>
						<div style={{ color: '#7278AD', fontWeight: '700' }}>{value}</div>
						<div>
							rate density as per today
						</div>
					</div>
					<div>
						Download Rate Density Results
					</div>
				</div>
				<div className={styles.table}>
					<Table columns={columns} data={data} />
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={2}
							totalItems={1000}
							pageSize={5}
						/>

					</div>

				</div>
			</div>

		</>
	);
}

export default RateDensityDetails;

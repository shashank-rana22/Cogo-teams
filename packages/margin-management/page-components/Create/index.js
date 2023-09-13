import { Button, FunnelStepper } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { useState, useEffect } from 'react';

import Layout from '../../common/Layout';

import getFclControls from './extraControls/getFclControls';
import getFclCustomsControls from './extraControls/getFclCustomsControls';
import getLclFreightControls from './extraControls/getLclFreightControls';
import getLtlFreight from './extraControls/getLtlFreight';
import getControls from './getControls';
import Margin from './Margin';
import { marginControls } from './marginControls';
import styles from './styles.module.css';

const items = [
	{ title: 'CUSTOMIZE YOUR DETAILS', key: 'customize' },
	{ title: 'ADD THE MARGINS', key: 'add' },
];
function Create({ type = 'create' }) {
	const [activeKey, setActiveKey] = useState('customize');
	const [idValues, setIdValues] = useState({});

	const handleChange = (obj, name) => {
		setIdValues((prev) => ({ ...prev, [name]: obj }));
	};
	const { controls: initialControls, DEFAULT_VALUES } = getControls({ handleChange, type });
	const [service, setService] = useState('');
	const {
		control,
		watch,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const formValues = watch();

	useEffect(() => {
		setService(formValues?.service);
	}, [formValues?.service]);

	let extraControls = (getFclControls({ handleChange, type })[service] || []);
	extraControls = (getFclCustomsControls({ handleChange, type })[service] || extraControls);
	extraControls = (getLclFreightControls({ handleChange, type })[service] || extraControls);
	extraControls = (getLtlFreight({ handleChange, type })[service] || extraControls);
	const controls = [...(initialControls || []), ...(extraControls || [])];

	return (
		<div className={styles.container}>
			<div className={styles.header_wrap}>
				<div style={{ alignItems: 'center', margin: '16px 0px 32px 0px' }}>
					<Link href="/margins">
						<Button themeType="link">
							<IcMArrowBack style={{ width: '2em', height: '2em', marginRight: '4px' }} />
							<div className={styles.heading}>Margin Management</div>
						</Button>
					</Link>

				</div>

			</div>
			<div className={styles.text}>CREATE NEW MARGIN</div>
			<FunnelStepper
				className={styles.stepper}
				active={activeKey}
				setActive={setActiveKey}
				items={items}
			/>
			{
				activeKey === 'customize' ? (
					<div>
						<Layout controls={controls} control={control} />
						<Button
							onClick={() => setActiveKey('add')}
						>
							Save and proceed
						</Button>
					</div>
				)
					: (
						<Margin
							formValues={formValues}
							idValues={idValues}
							type="create"
							service={service}
							marginControls={marginControls}
							control={control}
						/>
					)
			}

		</div>
	);
}
export default Create;

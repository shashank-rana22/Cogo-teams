import { IconFilter, Button, Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import { Card, Section, Label, Container, SelectStyled, Section1 } from './styles';

function FilterTooltip() {
	const [isVisible, setVisible] = useState(false);

	const handleTooltip = () => {
		setVisible(!isVisible);
	};

	function TooltipContent() {
		return (
			<Card style={{ width: 500 }}>
				<h3 className="heading">Filters</h3>
				<Container>
					<Section>
						<Label>Departure</Label>
						<input type="date" id="active_air_sch_filter_departure" />
					</Section>
					<Section>
						<Label>Arrival</Label>
						<input type="date" id="active_air_sch_filter_arrival" />
					</Section>
				</Container>
				<Section1>
					<Label>Shipping Line</Label>
					<SelectStyled placeholder="Carrier" id="active_air_sch_filter_shipping_line" />
				</Section1>
				<div className="footer">
					<Button className="button1" variant="secondary" id="active_air_sch_filter_reset">
						Reset
					</Button>
					<Button className="button2" variant="secondary" id="active_air_sch_filter_done">
						Done
					</Button>
				</div>
			</Card>
		);
	}

	return (
		<Tooltip
			maxWidth={500}
			theme="light"
			content={<TooltipContent />}
			visible={isVisible}
			placement="bottom-start"
			interactive
		>
			<Button
				size="md"
				variant="secondary"
				icon={<IconFilter />}
				onClick={handleTooltip}
				id="active_air_sch_filter_list"
			>
				<p>FILTER LIST</p>
			</Button>
		</Tooltip>
	);
}

export { FilterTooltip };

import { CreatableSelect } from "@cogoport/components";

function SortBy({ sortBy, setSortBy }) {
    const options = [
        { label: "Last Updated", value: "last_updated" },
        { label: "Total Transit (Low to High)", value: "total_transit" },
        { label: "Frequency (High to Low)", value: "frequency" },
    ];

    return (
        <div>
            <CreatableSelect
                value={sortBy}
                onChange={setSortBy}
                placeholder="Sort By"
                options={options}
                style={{ width: 192 }}
            />
        </div>
    );
}

export default SortBy;

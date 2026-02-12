export default function Filter({ value, onChange }) {
    return (
        <select value={value} onChange={onChange} className="border p-2 rounded mb-4">
            <option value="all">All</option>
            <option className="text-gray-900" value="Open">Open</option>
            <option className="text-gray-900" value="In Progress">In Progress</option>
            <option className="text-gray-900" value="Closed">Closed</option>
        </select>
    );
}

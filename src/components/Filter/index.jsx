export default function Filter({ value, onChange }) {
    return (
        <select value={value} onChange={onChange} className="border p-2 rounded text-gray-900 focus:outline-none">
            <option value="all">All</option>
            <option className="text-gray-900" value="open">Open</option>
            <option className="text-gray-900" value="in-progress">In Progress</option>
            <option className="text-gray-900" value="closed">Closed</option>
        </select>
    );
}

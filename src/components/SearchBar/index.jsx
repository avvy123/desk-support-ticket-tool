export default function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search tickets..."
            value={value}
            onChange={onChange}
            className="flex-1 border rounded-xl p-2 text-gray-900"
        />
    );
}

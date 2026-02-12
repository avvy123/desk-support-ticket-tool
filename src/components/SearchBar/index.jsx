export default function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search tickets..."
            value={value}
            onChange={onChange}
            className="w-full border p-2 rounded mb-4"
        />
    );
}

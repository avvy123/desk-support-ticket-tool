export default function Notification({ message, type }) {
    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
    return (
        <div className={`${bgColor} text-white p-2 rounded fixed top-4 right-4`}>
            {message}
        </div>
    );
}

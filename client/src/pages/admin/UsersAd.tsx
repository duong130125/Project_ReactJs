export default function UsersAd() {
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Users</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </li>
            <li className="py-4 flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                <p className="text-sm text-gray-500">jane.smith@example.com</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

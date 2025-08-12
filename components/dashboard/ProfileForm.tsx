export default function ProfileForm({
  form,
  handleChange,
  handleSubmit,
  onCancel,
  isEditing,
}: {
  form: any;
  handleChange: (e: any) => void;
  handleSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}) {
  return (
    <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isEditing ? "Edit Profile" : "Create Profile"}
      </h2>

      <div className="space-y-5">
        <input
          name="name"
          placeholder="Your Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="photo"
          placeholder="Photo URL"
          value={form.photo}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="skillsOffered"
          placeholder="Skills Offered (comma separated)"
          value={form.skillsOffered}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="skillsWanted"
          placeholder="Skills Wanted (comma separated)"
          value={form.skillsWanted}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="availability"
          placeholder="Availability (comma separated)"
          value={form.availability}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <label className="flex items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={form.isPublic}
            onChange={handleChange}
            className="mr-2"
          />
          Make profile public
        </label>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          {isEditing ? "Update Profile" : "Save Profile"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full mt-2 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

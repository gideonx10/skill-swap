import { User } from "@/types/user";

export default function ProfileView({
  profile,
  onEdit,
}: {
  profile: User;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email ?? "Not provided"}</p>
      <p><strong>Location:</strong> {profile.location ?? "Not set"}</p>
      <p><strong>Availability:</strong> {profile.availability?.join(", ") || "Not set"}</p>
      <p><strong>Skills Offered:</strong> {profile.skillsOffered?.join(", ") || "None"}</p>
      <p><strong>Skills Wanted:</strong> {profile.skillsWanted?.join(", ") || "None"}</p>
      <p><strong>Profile Visibility:</strong> {profile.isPublic ? "Public" : "Private"}</p>
      <button
        onClick={onEdit}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        Edit Profile
      </button>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../utils/auth";
import api from "../../utils/api";

type CustomSection = {
  id: number;
  title: string;
  details: string;
};

const initialProfile = {
  name: "",
  email: "",
  phone: "",
  skills: "",
  experience: "",
  education: "",
  linkedin: "",
  github: "",
};

const sectionTypes = [
  "Publications",
  "Certifications",
  "Short-term Assignments",
  "Awards",
  "Volunteer Work",
  "Other",
];

export default function ProfileEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "edit";
  const [profile, setProfile] = useState(initialProfile);
  const [profileLoading, setProfileLoading] = useState(false);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    if (mode === "edit") {
      setProfileLoading(true);
      api.get("/api/profile")
        .then(res => {
          if (res.data) setProfile({ ...initialProfile, ...res.data });
          setProfileLoading(false);
        })
        .catch(() => {
          setError("Failed to load profile.");
          setProfileLoading(false);
        });
    }
  }, [router, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (id: number, field: "title" | "details", value: string) => {
    setCustomSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleAddSection = () => {
    setCustomSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: sectionTypes[0],
        details: "",
      },
    ]);
  };

  const handleRemoveSection = (id: number) => {
    setCustomSections((prev) => prev.filter((section) => section.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // TODO: For profile fetch/save, use '/api/profile' endpoint as per backend routes.
      await new Promise((res) => setTimeout(res, 1000)); // Simulate API
      if (mode === "setup") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-xl bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-3xl shadow-2xl px-8 py-12 max-w-2xl w-full flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-indigo-900 dark:text-white mb-2">
          {mode === "setup" ? "Set Up Your Profile" : "Edit Your Profile"}
        </h1>
        {profileLoading ? (
          <div className="text-indigo-700 dark:text-white/80 text-lg">Loading profile...</div>
        ) : (
        <form className="w-full max-w-xl flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={profile.name}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">LinkedIn</label>
              <input
                name="linkedin"
                type="url"
                placeholder="LinkedIn URL"
                value={profile.linkedin}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">GitHub</label>
              <input
                name="github"
                type="url"
                placeholder="GitHub URL"
                value={profile.github}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
          {/* Skills, Experience, Education */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">Skills</label>
              <textarea
                name="skills"
                placeholder="Skills (comma separated)"
                value={profile.skills}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[48px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">Experience</label>
              <textarea
                name="experience"
                placeholder="Experience (roles, companies, years, etc.)"
                value={profile.experience}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[48px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-indigo-800 dark:text-white/80">Education</label>
              <textarea
                name="education"
                placeholder="Education (degrees, institutions, years, etc.)"
                value={profile.education}
                onChange={handleChange}
                className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[48px]"
              />
            </div>
          </div>
          {/* Custom Sections */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-semibold text-indigo-900 dark:text-white/90">Custom Sections</h2>
              <button
                type="button"
                className="ml-auto px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow"
                onClick={handleAddSection}
              >
                + Add Section
              </button>
            </div>
            {customSections.length === 0 && (
              <div className="text-indigo-700/70 dark:text-white/60 text-sm italic">No custom sections added yet.</div>
            )}
            {customSections.map((section, idx) => (
              <div key={section.id} className="bg-white/60 dark:bg-white/20 border border-white/30 rounded-xl p-4 flex flex-col gap-2 relative shadow-sm">
                <div className="flex gap-2 items-center">
                  <select
                    className="rounded-lg px-3 py-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                    value={section.title}
                    onChange={e => handleSectionChange(section.id, "title", e.target.value)}
                  >
                    {sectionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="ml-auto px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-semibold"
                    onClick={() => handleRemoveSection(section.id)}
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  className="rounded-lg px-3 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[40px]"
                  placeholder={`Details for ${section.title}`}
                  value={section.details}
                  onChange={e => handleSectionChange(section.id, "details", e.target.value)}
                />
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="mt-4 rounded-xl py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition text-lg"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : mode === "setup"
              ? "Complete Setup"
              : "Save Changes"}
          </button>
        </form>
        )}
      </div>
    </div>
  );
} 
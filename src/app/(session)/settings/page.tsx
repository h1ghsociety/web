import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProfileForm } from "@/components/settings/profile-form";
import { getServerAuthSession } from "@/server/auth";

const SettingsProfilePage = async () => {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>

        <p className="text-sm text-muted">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm session={session} />
    </div>
  );
};

export default SettingsProfilePage;

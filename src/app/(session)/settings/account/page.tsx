import { AccountForm } from "@/components/settings/account-form";
import { Separator } from "@/components/ui/separator";

const SettingsAccountPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
};

export default SettingsAccountPage;
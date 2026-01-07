import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

export function Verify() {
  const [params] = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Guard: prevent access without email parameter
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "red", fontWeight: 500 }}>
          Invalid or missing verification link
        </p>
      </div>
    );
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      navigate("/login");
    } catch (err) {
      console.error("Verification error:", err);
      alert("Verification failed. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleVerify} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Email Verification</h1>

        <Input
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar, CreditCard, Upload, Camera, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import kanjiLogo from "@/assets/kanji-logo.png";

const getRedirectPath = async (userId: string): Promise<string> => {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  const roles = data?.map((r) => r.role) ?? [];
  if (roles.includes("admin")) return "/admin";
  if (roles.includes("pundit")) return "/pundit";
  return "/";
};

const STEPS = ["Account", "Personal", "Identity", "Documents"];

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // KYC fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idType, setIdType] = useState("national_id");
  const [idNumber, setIdNumber] = useState("");
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      getRedirectPath(user.id).then((path) => navigate(path, { replace: true }));
    }
  }, [user, authLoading, navigate]);

  const uploadFile = async (file: File, userId: string, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${userId}/${folder}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("kyc-documents").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("kyc-documents").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (userId) {
        // Upload documents
        // Submit KYC via secure RPC (no active session yet)
        const { error: kycError } = await supabase.rpc("submit_kyc", {
          _user_id: userId,
          _full_name: fullName,
          _phone: phone,
          _date_of_birth: dateOfBirth,
          _id_type: idType,
          _id_number: idNumber,
          _id_front_url: null,
          _id_back_url: null,
          _selfie_url: null,
        });
        if (kycError) console.error("KYC submission error:", kycError);
      }

      toast({
        title: "Account created!",
        description: "Check your email to verify your account. Your KYC is pending admin review.",
      });
      setStep(0);
      setIsSignUp(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const path = await getRedirectPath(data.user.id);
      navigate(path);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "Error", description: String(error), variant: "destructive" });
    }
  };

  const canProceedStep = (s: number): boolean => {
    if (s === 0) return email.length > 0 && password.length >= 6;
    if (s === 1) return fullName.length > 0 && phone.length > 0 && dateOfBirth.length > 0;
    if (s === 2) return idNumber.length > 0;
    return true;
  };

  const FileUploadBox = ({
    label,
    icon: Icon,
    file,
    onFileChange,
  }: {
    label: string;
    icon: React.ElementType;
    file: File | null;
    onFileChange: (f: File | null) => void;
  }) => (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-4 transition-colors hover:border-primary hover:bg-secondary/30">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {file ? (
        <span className="flex items-center gap-1 text-xs text-primary">
          <Check className="h-3 w-3" /> {file.name.slice(0, 20)}
        </span>
      ) : (
        <span className="text-[11px] text-muted-foreground/60">Tap to upload</span>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      />
    </label>
  );

  // Sign-in form
  if (!isSignUp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-3">
            <img src={kanjiLogo} alt="Kanji" className="h-14 w-14 rounded-xl object-cover" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">KANJI</h1>
            <p className="text-sm text-muted-foreground">Welcome back</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <Button variant="outline" className="w-full gap-2" onClick={handleGoogleAuth}>
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" placeholder="john@example.co.tz" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 pr-9" required minLength={6} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
                {loading ? "Please wait..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              Don't have an account?{" "}
              <button onClick={() => setIsSignUp(true)} className="font-medium text-primary hover:underline">Sign up</button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Multi-step sign-up form
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3">
          <img src={kanjiLogo} alt="Kanji" className="h-14 w-14 rounded-xl object-cover" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">KANJI</h1>
          <p className="text-sm text-muted-foreground">Create your account</p>
        </div>

        {/* Step indicator */}
        <div className="mb-5 flex items-center justify-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-6 rounded transition-colors ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-sm font-semibold text-foreground">{STEPS[step]}</h2>

          <form onSubmit={step === 3 ? handleSignUp : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-4">
                {step === 0 && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Email</label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="email" placeholder="john@example.co.tz" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Password</label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 pr-9" required minLength={6} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Juma Mwalimu" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-9" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="tel" placeholder="+255 712 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Date of Birth</label>
                      <div className="relative mt-1">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="pl-9" required />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">ID Type</label>
                      <Select value={idType} onValueChange={setIdType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="national_id">National ID (NIDA)</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="driving_license">Driving License</SelectItem>
                          <SelectItem value="voter_id">Voter ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">ID Number</label>
                      <div className="relative mt-1">
                        <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Enter your ID number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="pl-9" required />
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <p className="text-xs text-muted-foreground">Upload clear photos of your ID and a selfie for verification.</p>
                    <div className="grid grid-cols-2 gap-3">
                      <FileUploadBox label="ID Front" icon={Upload} file={idFront} onFileChange={setIdFront} />
                      <FileUploadBox label="ID Back" icon={Upload} file={idBack} onFileChange={setIdBack} />
                    </div>
                    <FileUploadBox label="Selfie with ID" icon={Camera} file={selfie} onFileChange={setSelfie} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 pt-1">
              {step > 0 && (
                <Button type="button" variant="outline" className="flex-1 gap-1" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </Button>
              )}
              {step < 3 ? (
                <Button type="submit" className="flex-1 gap-1 bg-primary text-primary-foreground" disabled={!canProceedStep(step)}>
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              )}
            </div>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => { setIsSignUp(false); setStep(0); }} className="font-medium text-primary hover:underline">Sign in</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;

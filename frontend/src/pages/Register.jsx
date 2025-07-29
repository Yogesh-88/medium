import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthState } from "../store/slices/authSlice";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check, XCircle } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    bio: "",
  });

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const debouncedUsername = useDebounce(formData.username, 500);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!debouncedUsername || debouncedUsername.length < 4) {
        setUsernameAvailable(null);
        return;
      }

      setCheckingUsername(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/auth/check-username`,
          {
            params: { username: debouncedUsername },
            validateStatus: () => true, // handle non-200/409 without throwing
          }
        );

        if (res.status === 200) {
          setUsernameAvailable(true);
        } else if (res.status === 409) {
          setUsernameAvailable(false);
        } else {
          setUsernameAvailable(null);
        }
      } catch (err) {
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    };

    checkAvailability();
  }, [debouncedUsername]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameAvailable === false) return;
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="relative w-full">
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <div className="absolute right-2 top-2.5">
                {checkingUsername ? (
                  <Loader2 className="animate-spin text-gray-500 h-4 w-4" />
                ) : usernameAvailable === true ? (
                  <Check className="text-green-600 h-4 w-4" />
                ) : usernameAvailable === false ? (
                  <XCircle className="text-red-500 h-4 w-4" />
                ) : null}
              </div>
              {usernameAvailable === false && (
                <p className="text-red-500 text-xs mt-1">
                  Username is already taken
                </p>
              )}
              {usernameAvailable === true && (
                <p className="text-green-600 text-xs mt-1">
                  Username is available
                </p>
              )}
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Input
              name="avatar"
              type="url"
              placeholder="Avatar URL (optional)"
              value={formData.avatar}
              onChange={handleChange}
              className="md:col-span-2"
            />
            <Textarea
              name="bio"
              placeholder="Bio (optional, max 200 chars)"
              value={formData.bio}
              onChange={handleChange}
              className="md:col-span-2"
              maxLength={200}
            />

            {error && (
              <p className="text-red-500 text-sm col-span-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm col-span-2">
                Registered successfully!
              </p>
            )}

            <Button
              type="submit"
              className="w-full col-span-2"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}{" "}
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

import { FormEvent, useState } from "react";
import { useAuthSession } from "./AuthSessionContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { session } = useAuthSession();
  if (session) return <Navigate to="/" />;

  const handleLogin=async( e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true);
    try {

        const { error } = await supabase.auth.signInWithOtp({
          email,})

          if (error) {
            throw error;
          }
          alert("Check your email for the magic link!")

    }
    catch (error) {
        alert(error)
        
    }
    finally {
      setLoading(false);
    }

  }
  return (
    <div className={""}>
      <div>
        <h1>Notes APP</h1>
        <p>Sign In via Magic Link with your email below</p>

        {loading ? (
          "Sending magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label>Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
            <button> Send Magic Link</button>
          </form>
        )}
      </div>
    </div>
  );
};

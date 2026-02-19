import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import Post from "./components/Post/Post";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import { useAuth } from "./context/useAuth";
import { useState, type FormEvent } from "react";
import { usePosts } from "./hooks/usePosts";
import { signupApi, loginApi } from "./utils/api";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function App() {
  const { authToken, authTokenType, username, userId, logout } = useAuth();
  const { posts, addPost } = usePosts();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const { login } = useAuth();

  const signIn = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    try {
      const data = await loginApi(form.username, form.password);

      login(data.access_token, data.token_type, data.username, data.user_id);

      setForm({ username: "", password: "", email: "" });

      setOpenSignIn(false);
    } catch (error: unknown) {
      console.error("Error signing in:", error);
      alert((error as Error).message || "Sign in failed");
    }
  };

  const signOut = () => {
    logout();
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("authTokenType");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
  };

  const signUp = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    try {
      await signupApi(form.username, form.email, form.password);

      const loginResponse = await loginApi(form.username, form.password);

      login(
        loginResponse.access_token,
        loginResponse.token_type,
        loginResponse.username,
        loginResponse.user_id,
      );

      setOpenSignUp(false);

      setForm({ username: "", password: "", email: "" });
    } catch (error: unknown) {
      console.error("Error signing up:", error);
      alert((error as Error).message || "Signup failed");
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Mike Social App</Typography>
          {authToken ? (
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => setOpenSignIn(true)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => setOpenSignUp(true)}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={modalStyle}>
          <form onSubmit={signIn}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <Box sx={modalStyle}>
          <form onSubmit={signUp}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>
      <Container maxWidth="md" sx={{ mt: 4, pb: 12 }}>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid size={{ xs: 12 }} key={post.id}>
              <Post
                post={post}
                authToken={authToken}
                authTokenType={authTokenType}
                username={username}
              />
            </Grid>
          ))}
        </Grid>

        {authToken && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "background.paper",
              borderTop: "1px solid #ddd",
              p: 1,
              display: "flex",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 650 }}>
              <ImageUpload
                authToken={authToken}
                authTokenType={authTokenType!}
                userId={userId}
                onPostCreated={addPost}
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;

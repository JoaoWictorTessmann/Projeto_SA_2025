import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, senha);
    if (res.sucesso) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      setErro(res.erro || "Erro ao fazer login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {erro && <div style={{ color: "red" }}>{erro}</div>}
      <div>
        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate("/register")}>Criar Conta</button>
    </form>
  );
}

export default LoginForm;
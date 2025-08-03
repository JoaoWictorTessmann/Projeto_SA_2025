import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

function RegisterForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "admin",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.sucesso) {
      navigate("/login");
    } else {
      setErro(res.erro || "Erro ao cadastrar");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      {erro && <div style={{ color: "red" }}>{erro}</div>}
      <div>
        <label>Nome:</label>
        <input name="nome" value={form.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Senha:</label>
        <input name="senha" type="password" value={form.senha} onChange={handleChange} required />
      </div>
      <div>
        <label>Tipo:</label>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="admin">Administrador</option>
          <option value="funcionario">Colaborador</option>
        </select>
      </div>
      <button type="submit">Cadastrar</button>
      <button type="button" onClick={() => navigate("/login")}>Voltar ao Login</button>
    </form>
  );
}

export default RegisterForm;
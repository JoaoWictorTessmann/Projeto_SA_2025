import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    // Exemplo: decodificar o token para pegar nome/tipo (ajuste conforme o backend)
    const token = localStorage.getItem("token");
    if (token) {
      const [, payload] = token.split(".");
      const user = JSON.parse(atob(payload));
      setNome(user.nome || "");
      setTipo(user.tipo || "");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", marginTop: 40 }}>
      <h2>Painel</h2>
      <div>Bem-vindo, {nome} ({tipo})</div>
      <button onClick={handleLogout}>Sair</button>
      {/* Aqui você pode adicionar os componentes de pedido: PedidoList, PedidoForm, etc */}
      <div style={{ marginTop: 30 }}>
        <button>Adicionar Pedido</button>
        {/* Listagem de pedidos, editar, cancelar, finalizar, etc */}
      </div>
    </div>
  );
}

export default Dashboard;
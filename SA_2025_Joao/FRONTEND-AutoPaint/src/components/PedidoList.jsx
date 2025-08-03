import { useEffect, useState } from "react";
import { listarPedidos, cancelarPedido, finalizarPedido } from "../api/pedidos";

function PedidoList({ onEdit }) {
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPedidos = async () => {
    setLoading(true);
    setErro("");
    try {
      const data = await listarPedidos();
      setPedidos(data);
    } catch (err) {
      setErro(err.message || "Erro ao buscar pedidos");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleCancelar = async (id) => {
    if (!window.confirm("Deseja cancelar esse pedido?")) return;
    try {
      await cancelarPedido(id);
      fetchPedidos();
    } catch (err) {
      alert(err.message || "Erro ao cancelar pedido");
    }
  };

  const handleFinalizar = async (id) => {
    if (!window.confirm("Deseja finalizar esse pedido?")) return;
    try {
      await finalizarPedido(id);
      fetchPedidos();
    } catch (err) {
      alert(err.message || "Erro ao finalizar pedido");
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Pedidos</h3>
      {erro && <div style={{ color: "red" }}>{erro}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : pedidos.length === 0 ? (
        <div>Nenhum pedido encontrado.</div>
      ) : (
        <table border="1" cellPadding={6} style={{ width: "100%", maxWidth: 900 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente ID</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Cor</th>
              <th>Pagamento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id}>
                <td>{p.id_cliente}</td>
                <td>{p.cliente_id || p.id_cliente}</td>
                <td>{p.modelo_carro}</td>
                <td>{p.placa_carro}</td>
                <td>{p.cor_pintura}</td>
                <td>{p.forma_pagamento}</td>
                <td>{p.status_pedido}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Editar</button>{" "}
                  <button
                    onClick={() => handleCancelar(p.id)}
                    disabled={p.status_pedido !== "pendente"}
                  >
                    Cancelar
                  </button>{" "}
                  <button
                    onClick={() => handleFinalizar(p.id)}
                    disabled={p.status_pedido !== "pendente"}
                  >
                    Finalizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PedidoList;
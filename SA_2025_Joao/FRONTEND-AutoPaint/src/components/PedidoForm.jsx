import { useState, useEffect } from "react";
import { criarPedido, editarPedido } from "../api/pedidos";

function PedidoForm({ pedido, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    cliente_id: "",
    modelo_carro: "",
    placa_carro: "",
    cor_pintura: "",
    forma_pagamento: "pix",
    // status será controlado pelo backend; não precisa no cadastro
  });
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (pedido) {
      setForm({
        cliente_id: pedido.cliente_id || "",
        modelo_carro: pedido.modelo_carro || "",
        placa_carro: pedido.placa_carro || "",
        cor_pintura: pedido.cor_pintura || "",
        forma_pagamento: pedido.forma_pagamento || "pix",
      });
    }
  }, [pedido]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      if (pedido) {
        await editarPedido(pedido.id, form);
      } else {
        await criarPedido(form);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setErro(err.message || "Erro ao salvar pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h3>{pedido ? "Editar Pedido" : "Novo Pedido"}</h3>
      {erro && <div style={{ color: "red" }}>{erro}</div>}
      <div>
        <label>Cliente ID:</label>
        <input
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
          required
          type="number"
        />
      </div>
      <div>
        <label>Modelo do carro:</label>
        <input
          name="modelo_carro"
          value={form.modelo_carro}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Placa do carro:</label>
        <input
          name="placa_carro"
          value={form.placa_carro}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cor da pintura:</label>
        <input
          name="cor_pintura"
          value={form.cor_pintura}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Forma de pagamento:</label>
        <select
          name="forma_pagamento"
          value={form.forma_pagamento}
          onChange={handleChange}
        >
          <option value="pix">Pix</option>
          <option value="cartao_credito">Cartão de Crédito</option>
          <option value="cartao_debito">Cartão de Débito</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="boleto">Boleto</option>
        </select>
      </div>
      <div style={{ marginTop: 10 }}>
        <button type="submit">{pedido ? "Salvar" : "Adicionar"}</button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PedidoForm;
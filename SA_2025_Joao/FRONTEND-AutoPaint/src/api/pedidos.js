export async function criarPedido(pedido) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pedido),
  });
  if (!res.ok) throw new Error((await res.json()).erro || "Erro ao criar pedido");
  return res.json();
}

export async function editarPedido(id, pedido) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/pedidos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pedido),
  });
  if (!res.ok) throw new Error((await res.json()).erro || "Erro ao editar pedido");
  return res.json();
}
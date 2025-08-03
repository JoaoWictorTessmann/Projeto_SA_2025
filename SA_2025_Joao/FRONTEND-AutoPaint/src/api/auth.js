export async function login(email, senha) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();
    if (res.ok) return { sucesso: true, token: data.token };
    return { sucesso: false, erro: data.erro };
  } catch (err) {
    return { sucesso: false, erro: "Erro de rede" };
  }
}

export async function register({ nome, email, senha, tipo }) {
  try {
    const res = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, tipo }),
    });
    const data = await res.json();
    if (res.ok) return { sucesso: true };
    return { sucesso: false, erro: data.erro };
  } catch (err) {
    return { sucesso: false, erro: "Erro de rede" };
  }
}